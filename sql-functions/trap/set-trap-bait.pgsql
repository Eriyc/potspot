CREATE OR REPLACE FUNCTION 'set-trap-bait' (bait_id bigint)
    RETURNS SETOF PUBLIC.traps
    LANGUAGE plpgsql
    SECURITY INVOKER
    AS $$
BEGIN
    RETURN QUERY UPDATE
        public.traps
    SET
        bait = bait_id
    RETURNING
        *;
END;
$$
