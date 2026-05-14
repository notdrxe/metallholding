CREATE DATABASE IF NOT EXISTS metallholding
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE metallholding;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  thickness VARCHAR(64) NOT NULL,
  length_mm INT NOT NULL,
  width_mm INT NOT NULL,
  price_rub INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (name, category, image, description, thickness, length_mm, width_mm, price_rub)
SELECT * FROM (
  SELECT 'Лист оцинкованный', 'Листовой металл', '/products/item-sheet.png', 'Лист сначала отжигают, затем наносят цинковое покрытие для защиты от коррозии.', '0.5 мм', 1000, 2300, 874
  UNION ALL
  SELECT 'Труба профильная', 'Трубы', '/products/item-square-pipe.png', 'Профильная труба для строительных и монтажных работ.', '2 мм', 6000, 80, 1260
  UNION ALL
  SELECT 'Труба стальная', 'Трубы', '/products/item-round-pipe.png', 'Стальные трубы с высокой прочностью для инженерных задач.', '3 мм', 6000, 57, 1320
  UNION ALL
  SELECT 'Профлист', 'Кровля', '/products/item-proflist.png', 'Профнастил для кровли, фасадов и ограждений.', '0.45 мм', 2000, 1150, 790
  UNION ALL
  SELECT 'Арматура', 'Сортовой прокат', '/products/item-rebar.png', 'Арматура для железобетонных конструкций.', '12 мм', 11700, 12, 980
  UNION ALL
  SELECT 'Швеллер', 'Сортовой прокат', '/products/item-channel.png', 'Швеллер горячекатаный для несущих конструкций.', '6 мм', 12000, 100, 1400
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
