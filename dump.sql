-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 01, 2024 at 06:40 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `tree_fungi`
--

-- --------------------------------------------------------

--
-- Table structure for table `fungus`
--

CREATE TABLE `fungus` (
                          `id` int UNSIGNED NOT NULL COMMENT 'Primary key',
                          `latin_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'latin name of the fungus',
                          `name` varchar(191) NOT NULL COMMENT 'name of the fungus',
                          `life_span` enum('annual','perennial') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'annual or perennial',
                          `type_of_decay` enum('root rot and butt rot','trunk rot and branch rot') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'root rot or butt rot or trunk rot and branch rot',
                          `shape` enum('cap-and-stem','hoof-shaped','leathery crust') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'cap-and-stem or hoof-shaped or leathery crust',
                          `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'description of the fungus',
                          `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'path to the image file'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fungus`
--

INSERT INTO `fungus` (`id`, `latin_name`, `name`, `life_span`, `type_of_decay`, `shape`, `description`, `image`) VALUES
                                                                                                                     (1, 'Laetiporus sulphureus', 'sulphur polypore, sulphur shelf and chicken-of-the-woods', 'annual', 'trunk rot and branch rot', 'hoof-shaped', 'Laetiporus is a genus of edible mushrooms found throughout much of the world. Some species, especially Laetiporus sulphureus, are commonly known as sulphur shelf, chicken of the woods, the chicken mushroom, or the chicken fungus because it is often described as tasting like and having a texture similar to that of chicken meat.', ''),
                                                                                                                     (2, 'Heterobasidion annosum', 'conifer root, butt rot', 'perennial', 'root rot and butt rot', 'leathery crust', 'The fruiting bodies of the fungus, which are also known as basidiocarps, are normally brackets which are whitish around the margins and dark brown on the uneven, knobbly upper surface.[1] They can blacken in age.[2] They can also take a resupinate form, consisting only of a white crust which corresponds to the underside of the bracket. Basidiocarps are up to about 40 cm in diameter and 3.5 cm thick.[1] The fertile surface of the fruiting body is white, easily bruising brown, and has barely visible pores, with 3-4 per mm. The flesh, which has a strong fungus smell, is elastic when young but becomes woody when older.[3][4]\r\nSexual spores called basidiospores are created in the fertile layer on the lower surface of the basidiocarps, whilst conidiospores occur in the asexual stage and are produced on microscopic \"conidiophores\" which erupt through the surface of the host tree. Conidiospores and basidiospores are both produced by this fungus, the latter being more important for infecting the conifers.\r\nThe species is inedible.[5]\r\n', ''),
                                                                                                                     (3, 'Inonotus obliquus', 'chaga', 'perennial', 'trunk rot and branch rot', 'hoof-shaped', 'Inonotus obliquus causes a white heart rot to develop in the host tree. The chaga spores enter the tree through wounds, particularly poorly healed branch stubs. The white rot decay will spread throughout the heartwood of the host. During the infection cycle, penetration of the sapwood occurs only around the sterile exterior mycelium mass.[4] The chaga fungus will continue to cause decay within the living tree for 10–80+ years. While the tree is alive, only sterile mycelial masses are produced (the black exterior conk). The sexual stage begins after the tree, or some portion of the tree, is killed by the infection. I. obliquus will begin to produce fertile fruiting bodies underneath the bark. These bodies begin as a whitish mass that turn to brown with time. Since the sexual stage occurs almost entirely under the bark, the fruiting body is rarely seen.[5] These fruiting bodies produce basidiospores which will spread the infection to other vulnerable trees.\r\n\r\nThe mycelial canker is about 10–25 centimetres (4–10 in) wide, while the underlying crust can be 5–50 cm (2–19+1⁄2 in) long.[6]', '');

-- --------------------------------------------------------

--
-- Table structure for table `fungus_names`
--

CREATE TABLE `fungus_names` (
                                `id` int UNSIGNED NOT NULL,
                                `fungus_id` int UNSIGNED NOT NULL COMMENT 'Reference to Fungus table',
                                `language_code` enum('et','ru') NOT NULL COMMENT 'Language code: et = Estonian, ru = Russian',
                                `name` varchar(191) NOT NULL COMMENT 'Fungus name in specific language'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fungus_names`
--

INSERT INTO `fungus_names` (`id`, `fungus_id`, `language_code`, `name`) VALUES
                                                                            (4, 1, 'et', 'Vääveltorik'),
                                                                            (5, 1, 'ru', 'Трутовик серно-желтый'),
                                                                            (8, 2, 'et', 'Männi-juurepess'),
                                                                            (9, 2, 'ru', 'Корневая губка'),
                                                                            (10, 3, 'et', 'Must pässik'),
                                                                            (11, 3, 'ru', 'Трутови́к ско́шенный, или инонотус ско́шенный, в народе чага');

-- --------------------------------------------------------

--
-- Table structure for table `fungus_tree_genus`
--

CREATE TABLE `fungus_tree_genus` (
                                     `id` int UNSIGNED NOT NULL,
                                     `fungus_id` int UNSIGNED NOT NULL,
                                     `tree_genus_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fungus_tree_genus`
--

INSERT INTO `fungus_tree_genus` (`id`, `fungus_id`, `tree_genus_id`) VALUES
                                                                         (1, 1, 1),
                                                                         (2, 1, 2),
                                                                         (3, 1, 3),
                                                                         (4, 2, 4),
                                                                         (5, 2, 5),
                                                                         (6, 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `tree_genus`
--

CREATE TABLE `tree_genus` (
                              `id` int UNSIGNED NOT NULL COMMENT 'Primary key',
                              `genus_name` varchar(255) NOT NULL COMMENT 'Name of tree genus'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tree_genus`
--

INSERT INTO `tree_genus` (`id`, `genus_name`) VALUES
                                                  (6, 'Betula sp'),
                                                  (5, 'Juniperus sp'),
                                                  (4, 'Pinus sp'),
                                                  (1, 'Quercus sp'),
                                                  (3, 'Robinia sp'),
                                                  (2, 'Salix sp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fungus`
--
ALTER TABLE `fungus`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fungus_names`
--
ALTER TABLE `fungus_names`
    ADD PRIMARY KEY (`id`),
    ADD KEY `fungus_id` (`fungus_id`);

--
-- Indexes for table `fungus_tree_genus`
--
ALTER TABLE `fungus_tree_genus`
    ADD PRIMARY KEY (`id`),
    ADD KEY `tree_genus_id` (`tree_genus_id`);

--
-- Indexes for table `tree_genus`
--
ALTER TABLE `tree_genus`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `genus_name` (`genus_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fungus`
--
ALTER TABLE `fungus`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fungus_names`
--
ALTER TABLE `fungus_names`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `fungus_tree_genus`
--
ALTER TABLE `fungus_tree_genus`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tree_genus`
--
ALTER TABLE `tree_genus`
    MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key', AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fungus_names`
--
ALTER TABLE `fungus_names`
    ADD CONSTRAINT `fungus_names_ibfk_1` FOREIGN KEY (`fungus_id`) REFERENCES `fungus` (`id`) ON DELETE CASCADE;
COMMIT;
