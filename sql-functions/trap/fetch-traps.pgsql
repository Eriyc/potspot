CREATE OR REPLACE FUNCTION "v1/trap/fetch-all" ()
    RETURNS TABLE (
        j json)
    LANGUAGE plpgsql
    SECURITY INVOKER
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        to_json(jsonb_build_object('type', 'FeatureCollection', 'features', jsonb_agg(features.feature)))
    FROM (
        SELECT
            jsonb_build_object('type', 'Feature', 'id', id, 'geometry', ST_AsGeoJSON (pos)::jsonb, 'properties', to_jsonb (inputs) - 'id' - 'pos') AS feature
        FROM (
            SELECT
                id,
                pos,
                displayname
            FROM
                traps) inputs) features;
END;
$$
