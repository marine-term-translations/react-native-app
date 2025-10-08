# API Integration Guide

This document describes how the mobile app integrates with the backend API.

## Overview

The app uses the same backend API as the React Front-End, located at:
```
https://docker-dev.vliz.be:5002
```

All API calls are centralized in `src/services/apiService.js`.

## Authentication

All API requests require GitHub authentication via Bearer token:

```javascript
headers: {
  Authorization: 'Bearer ghp_xxxxxxxxxxxx'
}
```

The token is obtained via GitHub OAuth and stored securely using Expo SecureStore.

## API Endpoints

### Authentication

#### Get Current User
```
GET /api/github/user
Headers: { Authorization: <token> }
Response: { login: string, name: string, avatar_url: string, ... }
```

### Branches

#### List Branches
```
GET /api/github/branches
Query: { repo: string }
Headers: { Authorization: <token> }
Response: [
  {
    name: string,
    stats: {
      total: number,
      approved: number
    }
  }
]
```

#### Get Branch Diff
```
GET /api/github/diff
Query: { repo: string, branch: string }
Headers: { Authorization: <token> }
Response: {
  files: [
    {
      filename: string,
      translations: { [key: string]: string }
    }
  ]
}
```

### Translations

#### Update File
```
PUT /api/github/update
Headers: { Authorization: <token> }
Body: {
  repo: string,
  translations: object,
  filename: string,
  branch: string
}
Response: { success: boolean }
```

#### Auto Update
```
PUT /api/github/auto-update
Headers: { Authorization: <token> }
Body: {
  repo: string,
  branch: string,
  before: string,
  after: string
}
Response: { success: boolean }
```

#### Get Changed Files
```
GET /api/github/changed
Query: { repo: string, branch: string }
Headers: { Authorization: <token> }
Response: [
  {
    filename: string,
    status: 'modified' | 'added' | 'removed',
    patch: string
  }
]
```

#### Get Commits
```
GET /api/github/commits
Query: { repo: string, branch: string }
Headers: { Authorization: <token> }
Response: [
  {
    sha: string,
    message: string,
    author: string,
    date: string
  }
]
```

### File Content

#### Get Content
```
GET /api/github/content
Query: { repo: string, path: string }
Headers: { Authorization: <token> }
Response: {
  content: string,
  encoding: 'base64',
  sha: string
}
```

### Reviews

#### Get Reviewers
```
GET /api/github/reviewers
Query: { repo: string, branch: string }
Headers: { Authorization: <token> }
Response: [
  {
    login: string,
    role: 'reviewer' | 'maintainer'
  }
]
```

#### Check File Approval Status
```
GET /api/github/pr/:prNumber/file/:filePath/approved
Query: { repo: string, branch: string }
Headers: { Authorization: <token> }
Response: {
  approved: boolean,
  approvers: string[]
}
```

#### Approve File
```
POST /api/github/pr/:prNumber/file/:filePath/approve
Headers: { Authorization: <token> }
Body: {
  repo: string,
  sha: string,
  lang: string,
  label_name: string
}
Response: { success: boolean }
```

#### Get PR Comments
```
GET /api/github/pr/comments
Query: { repo: string, prNumber: number }
Headers: { Authorization: <token> }
Response: [
  {
    id: number,
    body: string,
    user: string,
    created_at: string
  }
]
```

## Error Handling

The API returns standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized (invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a message:
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Usage Examples

### Fetching Branches

```javascript
import { fetchBranches } from '../services/apiService';

const loadBranches = async () => {
  try {
    const token = await SecureStore.getItemAsync('github_token');
    const branches = await fetchBranches(token);
    console.log('Branches:', branches);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Updating Translations

```javascript
import { sendUpdateFile } from '../services/apiService';

const saveTranslations = async () => {
  try {
    await sendUpdateFile('file.ttl', {
      'term1': 'translation1',
      'term2': 'translation2'
    });
    console.log('Saved successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Getting Current User

```javascript
import { getCurrentUser } from '../services/apiService';

const fetchUser = async () => {
  try {
    const token = await SecureStore.getItemAsync('github_token');
    const user = await getCurrentUser(token);
    console.log('User:', user);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Rate Limiting

GitHub API has rate limits:
- Authenticated: 5,000 requests/hour
- Unauthenticated: 60 requests/hour

The app uses authenticated requests, so you should stay well within limits.

## Security Notes

1. **Never commit tokens**: Tokens are stored in SecureStore, never in code
2. **HTTPS only**: All API calls use HTTPS
3. **Token expiration**: Tokens may expire; handle 401 errors by re-authenticating
4. **Scopes**: Request only necessary OAuth scopes (repo, user)

## Testing API Calls

Use tools like Postman or curl to test API endpoints:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://docker-dev.vliz.be:5002/api/github/branches?repo=demo_with_gh_actions
```

## Environment Configuration

API configuration is in `.env`:

```env
EXPO_PUBLIC_API_BASE_URL=https://docker-dev.vliz.be:5002
EXPO_PUBLIC_REPO=demo_with_gh_actions
```

Change these values for different environments (dev, staging, production).
