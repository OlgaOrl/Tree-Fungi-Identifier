-- Arvutab keskmise ID mitmeaastastele seentele, mis põhjustavad tüve- ja oksamädanikku.
SELECT AVG(id) AS avg_id
FROM fungus
WHERE life_span = 'perennial'
  AND type_of_decay = 'trunk rot and branch rot';
-- Arvutab ID-de summa seentele, mille kuju ei ole kopitakujuline.
SELECT SUM(id) AS total_id
FROM fungus
WHERE NOT shape = 'hoof-shaped';
-- Loendab mitmeaastased seened, mis kas ei ole kopitakujulised või põhjustavad tüve- ja oksamädanikku.
SELECT COUNT(*) AS count_complex_condition
FROM fungus
WHERE life_span = 'perennial'
  AND (NOT shape = 'hoof-shaped' OR type_of_decay = 'trunk rot and branch rot');