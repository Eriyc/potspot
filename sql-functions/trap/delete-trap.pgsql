CREATE OR REPLACE FUNCTION 'delete-trap' (id bigint, OUT success bool)
    RETURNS bool
    LANGUAGE plpgsql
    SECURITY INVOKER
    AS $$
BEGIN
    EXECUTE format('
            DELETE FROM public.traps
            WHERE id = $1
            RETURNING TRUE')
    USING id INTO success;
    RETURN FALSE;
END;
$$
