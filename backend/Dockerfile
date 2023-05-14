# Base image
FROM php:8.0-apache

# Set working directory
WORKDIR /var/www/html

# Enable Apache modules
RUN a2enmod rewrite

# Install dependencies
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath opcache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copy the entire Laravel project to the working directory
COPY . .

# Generate optimized autoloader files
RUN composer dump-autoload --optimize

# Set file and directory permissions
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Set Apache document root
RUN sed -i 's/DocumentRoot \/var\/www\/html/DocumentRoot \/var\/www\/html\/public/g' /etc/apache2/sites-available/000-default.conf

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Expose the port that Apache listens on
EXPOSE 8080

# Set the command to run the Apache web server
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
