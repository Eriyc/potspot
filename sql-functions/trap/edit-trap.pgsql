CREATE OR REPLACE FUNCTION 'edit-trap' (details json)
    RETURNS SETOF PUBLIC.traps
    LANGUAGE plpgsql
    SECURITY INVOKER
    AS $$
BEGIN
    RETURN QUERY UPDATE
        public.traps
    SET
        displayname = $1 ->> 'displayname'
    RETURNING
        *;
END;
$$
