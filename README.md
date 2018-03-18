# CacheAPI

## Features
- Return cached data
- Remove cached data
- Remove all cached data
- Fetch all cached data

## API Endpoints

**Response Format: **
```
{ key: <cache key>, value: <cache value }

```
| **HTTP Verb** | **Endpoint** | **Functionality**|
|------|-------|-----------------|
| **POST** | /cache | Creates a cache record |
| **GET** | /cache/:key | Gets a cache record by key |
| **GET** | /cache | Gets all cache records |
| **DELETE** | /cache/:key | Deletes a cache record by key |
| **DELETE** | /cache | Deletes all cache records |


## Commit Conventions

A commit message consists of a header, a body and a footer, separated by a blank line.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on github as well as in various git tools.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
```

The type can be one of the following:
```
feat (feature)
fix (bug fix)
test (when adding missing tests)
chore (maintain)
```

## Deviations
- Yarn instead of NPM was used as I've found it to be much more stable based on the lock file.

## Known Bugs:
- Uncertain about what's expected from TTL so it's not been implemented yet.
- API Versioning hasn't been implemented