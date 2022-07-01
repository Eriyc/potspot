CREATE OR REPLACE FUNCTION 'create-trap' (details json)
    RETURNS SETOF PUBLIC.traps
    LANGUAGE plpgsql
    SECURITY INVOKER
    AS $$
DECLARE
    displayname text := $1 ->> 'displayname';
BEGIN
    IF $1 ->> 'displayname' IS NULL THEN
        displayname := 'Tina' || ' ' || (
            SELECT
                count(*)
            FROM
                public.traps
            WHERE
                created_by = auth.uid ()) + 1;
    END IF;
    RETURN QUERY INSERT INTO public.traps (created_by, displayname, pos)
        VALUES (auth.uid (), displayname, ST_GeomFromGeoJSON ($1 ->> 'pos'))
    RETURNING
        *;
END;
$$
