CREATE
OR REPLACE FUNCTION "v1/trap/move" (details json) RETURNS SETOF PUBLIC.traps LANGUAGE plpgsql SECURITY INVOKER AS $$
BEGIN
    RETURN QUERY UPDATE
        public.traps
    SET
        pos = ST_GeomFromGeoJSON ($1 ->> 'pos')
    RETURNING
        *;
END;
$$