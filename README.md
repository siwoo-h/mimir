# mimir

## Trouble Shooting

[mysql] Data too long for column 에러 해결 방법: sql_mode 변경

1. mysql 접속

```
$ mysql -u root -p
```

2. sql_mode 확인

```
$ select @@global.sql_mode;

..., STRICT_TRANS_TABLES, ...
```

3. sql_mode 수정

```
SET @@global.sql_mode='NO_ENGINE_SUBSTITUTION';

Query OK, 0 rows affected (0.00 sec)
```
