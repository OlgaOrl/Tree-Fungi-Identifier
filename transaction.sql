-- Alustame transaktsiooni
START TRANSACTION;

-- Esimene operatsioon: lisame uue seene tabelisse `fungus`
INSERT INTO `fungus` (`latin_name`, `name`, `life_span`, `type_of_decay`, `shape`, `description`, `image`)
VALUES ('Ganoderma lucidum', 'lingzhi', 'perennial', 'trunk rot and branch rot', 'hoof-shaped', 'Medicinal fungus widely used in traditional medicine.', '');

-- Teine operatsioon: lisame uue vaste seenele tabelisse `fungus_names`
INSERT INTO `fungus_names` (`fungus_id`, `language_code`, `name`)
VALUES (9, 'et', 'Reishi');

-- Kolmas operatsioon: tahtlik viga - lisame vale võõrvõtmega kirje tabelisse `fungus_tree_genus`
INSERT INTO `fungus_tree_genus` (`fungus_id`, `tree_genus_id`)
VALUES (999, 1);  -- Vigane võõrvõti, seent ID-ga 999 ei eksisteeri

-- Kui kõik õnnestub, kinnitame muudatused
COMMIT;

-- Kui tekib viga, tühistame kogu transaktsiooni
ROLLBACK;