/*
  # Time Capsules Schema

  1. New Tables
    - `time_capsules`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `message` (text)
      - `file_url` (text)
      - `unlock_date` (timestamptz)
      - `is_locked` (boolean)
      - `password` (text)
      - `attempts` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `time_capsules` table
    - Add policies for:
      - Users can read their own capsules
      - Users can create their own capsules
      - Users can update their own capsules
      - Users can delete their own capsules
*/

CREATE TABLE IF NOT EXISTS time_capsules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  message text,
  file_url text,
  unlock_date timestamptz NOT NULL,
  is_locked boolean DEFAULT true,
  password text NOT NULL,
  attempts integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE time_capsules ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own capsules"
  ON time_capsules
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own capsules"
  ON time_capsules
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own capsules"
  ON time_capsules
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own capsules"
  ON time_capsules
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);