CREATE OR REPLACE FUNCTION "v1/trap/fetch-single" (id int8)
    RETURNS SETOF traps
    LANGUAGE plpgsql
    SECURITY INVOKER
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        id,
        created_by,
        displayname,
        pos,
        in_use,
        bait
    FROM public.traps
    WHERE traps.id = id;
END;
$$
