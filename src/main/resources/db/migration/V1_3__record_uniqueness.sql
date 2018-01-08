
ALTER TABLE configuration_record ADD UNIQUE record_uniqueness(name, app_name, is_active);