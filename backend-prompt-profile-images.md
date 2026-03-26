# Prompt: Profile Images API (Avatar & Background)

## Задача
Добавить функционал для загрузки и хранения URL аватара и фоновой картинки пользователя.

## Требования к базе данных

Создать новую таблицу `profile_images` (или добавить поля в существующую таблицу `user_profiles`):

### Вариант 1: Отдельная таблица
```sql
CREATE TABLE profile_images (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  background_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Вариант 2: Добавить поля в user_profiles
```sql
ALTER TABLE user_profiles 
ADD COLUMN avatar_url TEXT,
ADD COLUMN background_url TEXT;
```

**Рекомендация:** Использовать Вариант 2 (добавить поля в `user_profiles`), так как это упростит работу с профилем.

## API Endpoints

### 1. Загрузка аватара
```
POST /profile/upload-avatar
Content-Type: multipart/form-data

Request Body:
- file: Image file (jpeg, png, webp, max 5MB)

Response 200:
{
  "avatar_url": "https://.../avatars/user_123.jpg"
}
```

### 2. Загрузка фона профиля
```
POST /profile/upload-background
Content-Type: multipart/form-data

Request Body:
- file: Image file (jpeg, png, webp, max 10MB)

Response 200:
{
  "background_url": "https://.../backgrounds/user_123.jpg"
}
```

### 3. Получение текущего профиля с фото
```
GET /profile

Response 200:
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "bio": "...",
  "location": "...",
  "user": { ... },
  "avatar_url": "https://.../avatars/user_1.jpg",
  "background_url": "https://.../backgrounds/user_1.jpg"
}
```

### 4. Удаление аватара
```
DELETE /profile/avatar

Response 200:
{
  "success": true
}
```

### 5. Удаление фона
```
DELETE /profile/background

Response 200:
{
  "success": true
}
```

## Требования к реализации

1. **Аутентификация:** Все эндпоинты должны требовать JWT токен
2. **Валидация:** Проверять тип файла (только изображения) и размер
3. **Хранение:** Сохранять файлы в `/uploads/avatars` и `/uploads/backgrounds`
4. **URL в ответе:** Возвращать полный URL или относительный путь к файлу
5. **Обновление профиля:** При GET /profile возвращать поля `avatar_url` и `background_url`

## Пример реализации (NestJS)

```typescript
@Post('upload-avatar')
@UseInterceptors(FileInterceptor('file'))
async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
  const userId = req.user.id;
  const avatarUrl = `/uploads/avatars/${file.filename}`;
  
  await this.profileService.updateAvatar(userId, avatarUrl);
  
  return { avatar_url: avatarUrl };
}

@Post('upload-background')
@UseInterceptors(FileInterceptor('file'))
async uploadBackground(@UploadedFile() file: Express.Multer.File, @Request() req) {
  const userId = req.user.id;
  const backgroundUrl = `/uploads/backgrounds/${file.filename}`;
  
  await this.profileService.updateBackground(userId, backgroundUrl);
  
  return { background_url: backgroundUrl };
}
```

## Обновление модели UserProfile

Добавить поля в модель:
```typescript
export interface UserProfile {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  location?: string | null;
  user: User;
  avatar_url?: string | null;      // NEW
  background_url?: string | null;  // NEW
}
```
