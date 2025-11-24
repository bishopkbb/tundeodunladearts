-- Add SELECT policy for newsletter_subscriptions
-- This allows checking for existing subscriptions

-- Newsletter: Allow SELECT for checking existing subscriptions
-- Using service role key should bypass RLS, but this is good practice
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'newsletter_subscriptions' 
        AND policyname = 'Public can check newsletter subscriptions'
    ) THEN
        CREATE POLICY "Public can check newsletter subscriptions"
            ON public.newsletter_subscriptions
            FOR SELECT
            USING (true);
    END IF;
END $$;

-- Newsletter: Allow UPDATE for reactivating subscriptions
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'newsletter_subscriptions' 
        AND policyname = 'Public can update newsletter subscriptions'
    ) THEN
        CREATE POLICY "Public can update newsletter subscriptions"
            ON public.newsletter_subscriptions
            FOR UPDATE
            USING (true)
            WITH CHECK (true);
    END IF;
END $$;

