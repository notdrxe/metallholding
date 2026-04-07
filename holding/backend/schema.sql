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
  SELECT 'Лист оцинкованный', 'Листовой металл', 'https://images.unsplash.com/photo-1571817231893-541188cf89c2?auto=format&fit=crop&w=800&q=80', 'Лист сначала отжигают, затем наносят цинковое покрытие для защиты от коррозии.', '0.5 мм', 1000, 2300, 874
  UNION ALL
  SELECT 'Труба профильная', 'Трубы', 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80', 'Профильная труба для строительных и монтажных работ.', '2 мм', 6000, 80, 1260
  UNION ALL
  SELECT 'Труба стальная', 'Трубы', 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80', 'Стальные трубы с высокой прочностью для инженерных задач.', '3 мм', 6000, 57, 1320
  UNION ALL
  SELECT 'Профлист', 'Кровля', 'https://images.unsplash.com/photo-1611403572765-26790f7e6ddc?auto=format&fit=crop&w=800&q=80', 'Профнастил для кровли, фасадов и ограждений.', '0.45 мм', 2000, 1150, 790
  UNION ALL
  SELECT 'Арматура', 'Сортовой прокат', 'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?auto=format&fit=crop&w=800&q=80', 'Арматура для железобетонных конструкций.', '12 мм', 11700, 12, 980
  UNION ALL
  SELECT 'Швеллер', 'Сортовой прокат', 'https://images.unsplash.com/photo-1609205807107-e8ec2120f6f5?auto=format&fit=crop&w=800&q=80', 'Швеллер горячекатаный для несущих конструкций.', '6 мм', 12000, 100, 1400
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
