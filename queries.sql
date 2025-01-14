SELECT
    f.id AS FungusID,               -- Seene ID
    f.latin_name AS LatinName,      -- Seene ladinakeelne nimi
    f.name AS CommonName,           -- Seene üldnimi
    fg.genus_name AS TreeGenus,     -- Puude perekonna nimi
    fn.name AS LocalizedName,       -- Kohalik nimi (valitud keeles)
    f.type_of_decay AS DecayType    -- Seene põhjustatud lagunemise tüüp
FROM
    fungus f                        -- Põhitabel: seened
        INNER JOIN
    fungus_tree_genus ftg ON f.id = ftg.fungus_id  -- Seob seened ja puud nende seose tabeliga
        INNER JOIN
    tree_genus fg ON ftg.tree_genus_id = fg.id    -- Seob puude perekonna andmed
        INNER JOIN
    fungus_names fn ON f.id = fn.fungus_id        -- Seob seente kohalikud nimed
WHERE
    fn.language_code = 'et'         -- Filtreerib ainult eesti keelse nimega kirjed
  AND fg.genus_name = 'Betula sp' -- Filtreerib puud perekonnast Betula
ORDER BY
    f.name;                         -- Sorteerib tulemused seene üldnime järgi (tõusev on vaikimisi)
