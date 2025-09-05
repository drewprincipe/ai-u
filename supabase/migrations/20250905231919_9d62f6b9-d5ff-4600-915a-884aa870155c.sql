-- Create enum for learner types (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'learner_type') THEN
        CREATE TYPE public.learner_type AS ENUM (
          'high_school_student',
          'college_student', 
          'adult_learner',
          'professional',
          'k12_student'
        );
    END IF;
END
$$;

-- Create enum for learning path categories (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'path_category') THEN
        CREATE TYPE public.path_category AS ENUM (
          'degree_program',
          'certificate',
          'skill_building',
          'career_change',
          'enrichment'
        );
    END IF;
END
$$;

-- Create learning paths table
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category path_category NOT NULL,
  target_learner_type learner_type NOT NULL,
  duration_weeks INTEGER NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
  prerequisites TEXT[],
  career_outcomes TEXT[],
  total_courses INTEGER NOT NULL DEFAULT 0,
  estimated_hours INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning path courses junction table
CREATE TABLE IF NOT EXISTS public.learning_path_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  learning_path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL, -- References course IDs from mock service
  order_in_path INTEGER NOT NULL,
  is_required BOOLEAN DEFAULT true,
  semester INTEGER, -- For degree programs
  year INTEGER, -- For degree programs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(learning_path_id, course_id),
  UNIQUE(learning_path_id, order_in_path)
);

-- Create user learning path progress table
CREATE TABLE IF NOT EXISTS public.user_learning_path_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learning_path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_course_id TEXT,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, learning_path_id)
);

-- Add learner_type to existing user_profiles if column doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name='user_profiles' AND column_name='learner_type'
    ) THEN
        ALTER TABLE public.user_profiles ADD COLUMN learner_type learner_type;
    END IF;
END
$$;

-- Add other profile columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='education_level') THEN
        ALTER TABLE public.user_profiles ADD COLUMN education_level TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='current_grade_level') THEN
        ALTER TABLE public.user_profiles ADD COLUMN current_grade_level TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='career_goals') THEN
        ALTER TABLE public.user_profiles ADD COLUMN career_goals TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='interests') THEN
        ALTER TABLE public.user_profiles ADD COLUMN interests TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='available_hours_per_week') THEN
        ALTER TABLE public.user_profiles ADD COLUMN available_hours_per_week INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='preferred_learning_style') THEN
        ALTER TABLE public.user_profiles ADD COLUMN preferred_learning_style TEXT;
    END IF;
END
$$;

-- Enable RLS on new tables
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_path_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for learning_paths (public read)
DROP POLICY IF EXISTS "Learning paths are publicly readable" ON public.learning_paths;
CREATE POLICY "Learning paths are publicly readable" ON public.learning_paths
  FOR SELECT USING (true);

-- RLS Policies for learning_path_courses (public read)
DROP POLICY IF EXISTS "Learning path courses are publicly readable" ON public.learning_path_courses;
CREATE POLICY "Learning path courses are publicly readable" ON public.learning_path_courses
  FOR SELECT USING (true);

-- RLS Policies for user_learning_path_progress (users can only access their own)
DROP POLICY IF EXISTS "Users can view their own learning path progress" ON public.user_learning_path_progress;
CREATE POLICY "Users can view their own learning path progress" ON public.user_learning_path_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own learning path progress" ON public.user_learning_path_progress;
CREATE POLICY "Users can update their own learning path progress" ON public.user_learning_path_progress
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own learning path progress" ON public.user_learning_path_progress;
CREATE POLICY "Users can insert their own learning path progress" ON public.user_learning_path_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create or replace function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_learning_paths_updated_at ON public.learning_paths;
CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample learning paths data
INSERT INTO public.learning_paths (title, description, category, target_learner_type, duration_weeks, difficulty_level, prerequisites, career_outcomes, total_courses, estimated_hours, image_url, is_featured) VALUES
('Complete Physics Degree Program', 'Comprehensive 4-year physics degree covering mechanics, thermodynamics, electromagnetism, quantum mechanics, and modern physics. Perfect preparation for graduate study or physics careers.', 'degree_program', 'college_student', 208, 'Advanced', ARRAY['Strong mathematics background', 'Calculus I completion'], ARRAY['Research Physicist', 'Engineering Physicist', 'Data Scientist', 'Graduate School'], 12, 1200, '/src/assets/course-physics.jpg', true),

('Business Administration Degree', 'Complete business degree covering management, marketing, finance, economics, and entrepreneurship. Ideal for future business leaders and entrepreneurs.', 'degree_program', 'college_student', 208, 'Intermediate', ARRAY['High school diploma', 'Basic mathematics'], ARRAY['Business Manager', 'Entrepreneur', 'Consultant', 'MBA Preparation'], 10, 1000, '/src/assets/hero-education.jpg', true),

('High School Core Curriculum', 'Essential high school education covering English, mathematics, science, and history. Perfect foundation for college preparation.', 'degree_program', 'high_school_student', 144, 'Intermediate', ARRAY['8th grade completion'], ARRAY['College Preparation', 'High School Diploma'], 8, 800, '/src/assets/course-science.jpg', true),

('Adult Career Transition - Healthcare', 'Accelerated program for adults transitioning to healthcare careers, focusing on biology, chemistry, and medical fundamentals.', 'career_change', 'adult_learner', 52, 'Beginner', ARRAY['High school education'], ARRAY['Medical Assistant', 'Nursing Preparation', 'Healthcare Technician'], 5, 520, '/src/assets/course-biology.jpg', false),

('Elementary STEM Foundation', 'Comprehensive STEM education for elementary students, building strong foundations in mathematics and science through engaging activities.', 'enrichment', 'k12_student', 72, 'Beginner', ARRAY['Grade appropriate reading'], ARRAY['STEM Confidence', 'Academic Excellence', 'Critical Thinking'], 3, 360, '/src/assets/course-elementary-math.jpg', false),

('Professional Science Refresher', 'Advanced science courses for working professionals looking to update their knowledge in physics, chemistry, and biology.', 'skill_building', 'professional', 36, 'Advanced', ARRAY['Undergraduate science degree'], ARRAY['Career Advancement', 'Research Roles', 'Technical Leadership'], 6, 432, '/src/assets/course-chemistry.jpg', false)
ON CONFLICT (title) DO NOTHING;

-- Insert learning path course relationships
-- Physics Degree Program
INSERT INTO public.learning_path_courses (learning_path_id, course_id, order_in_path, semester, year) VALUES
((SELECT id FROM public.learning_paths WHERE title = 'Complete Physics Degree Program'), 'calculus-1', 1, 1, 1),
((SELECT id FROM public.learning_paths WHERE title = 'Complete Physics Degree Program'), 'physics-101', 2, 1, 1),
((SELECT id FROM public.learning_paths WHERE title = 'Complete Physics Degree Program'), 'advanced-calculus', 3, 2, 1),
((SELECT id FROM public.learning_paths WHERE title = 'Complete Physics Degree Program'), 'chemistry-basics', 4, 1, 2)
ON CONFLICT (learning_path_id, course_id) DO NOTHING;

-- Business Administration Degree  
INSERT INTO public.learning_path_courses (learning_path_id, course_id, order_in_path, semester, year) VALUES
((SELECT id FROM public.learning_paths WHERE title = 'Business Administration Degree'), 'elementary-math', 1, 1, 1),
((SELECT id FROM public.learning_paths WHERE title = 'Business Administration Degree'), 'english-literature', 2, 1, 1),
((SELECT id FROM public.learning_paths WHERE title = 'Business Administration Degree'), 'world-history', 3, 2, 1)
ON CONFLICT (learning_path_id, course_id) DO NOTHING;

-- High School Core Curriculum
INSERT INTO public.learning_path_courses (learning_path_id, course_id, order_in_path, semester, year) VALUES
((SELECT id FROM public.learning_paths WHERE title = 'High School Core Curriculum'), 'english-literature', 1, 1, 1),
((SELECT id FROM public.learning_paths WHERE title = 'High School Core Curriculum'), 'calculus-1', 2, 1, 1),
((SELECT id FROM public.learning_paths WHERE title = 'High School Core Curriculum'), 'chemistry-basics', 3, 2, 1),
((SELECT id FROM public.learning_paths WHERE title = 'High School Core Curriculum'), 'biology-fundamentals', 4, 2, 1),
((SELECT id FROM public.learning_paths WHERE title = 'High School Core Curriculum'), 'world-history', 5, 1, 2),
((SELECT id FROM public.learning_paths WHERE title = 'High School Core Curriculum'), 'physics-101', 6, 2, 2)
ON CONFLICT (learning_path_id, course_id) DO NOTHING;

-- Adult Career Transition - Healthcare
INSERT INTO public.learning_path_courses (learning_path_id, course_id, order_in_path) VALUES
((SELECT id FROM public.learning_paths WHERE title = 'Adult Career Transition - Healthcare'), 'biology-fundamentals', 1),
((SELECT id FROM public.learning_paths WHERE title = 'Adult Career Transition - Healthcare'), 'chemistry-basics', 2),
((SELECT id FROM public.learning_paths WHERE title = 'Adult Career Transition - Healthcare'), 'organic-chemistry', 3)
ON CONFLICT (learning_path_id, course_id) DO NOTHING;

-- Elementary STEM Foundation
INSERT INTO public.learning_path_courses (learning_path_id, course_id, order_in_path) VALUES
((SELECT id FROM public.learning_paths WHERE title = 'Elementary STEM Foundation'), 'elementary-math', 1),
((SELECT id FROM public.learning_paths WHERE title = 'Elementary STEM Foundation'), 'middle-school-science', 2)
ON CONFLICT (learning_path_id, course_id) DO NOTHING;

-- Professional Science Refresher
INSERT INTO public.learning_path_courses (learning_path_id, course_id, order_in_path) VALUES
((SELECT id FROM public.learning_paths WHERE title = 'Professional Science Refresher'), 'physics-101', 1),
((SELECT id FROM public.learning_paths WHERE title = 'Professional Science Refresher'), 'chemistry-basics', 2),
((SELECT id FROM public.learning_paths WHERE title = 'Professional Science Refresher'), 'biology-fundamentals', 3),
((SELECT id FROM public.learning_paths WHERE title = 'Professional Science Refresher'), 'organic-chemistry', 4),
((SELECT id FROM public.learning_paths WHERE title = 'Professional Science Refresher'), 'advanced-calculus', 5)
ON CONFLICT (learning_path_id, course_id) DO NOTHING;