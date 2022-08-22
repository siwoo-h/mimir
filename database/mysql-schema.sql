-- USER table
create table user
(
    id            binary(16)   not null primary key,
    email         varchar(255) not null,
    nickname      varchar(255) not null,
    password      varchar(255) not null,
    registered_at datetime     not null,
    updated_at    datetime     not null,
    disabled_at   datetime     null,
    constraint user_email_unique
        unique (email),
    constraint user_nickname_unique
        unique (nickname)
);

-- ARTICLE table
create table article
(
    id         int  unsigned    not null    auto_increment  primary key,
    title      varchar(255)     not null,
    content    text             null,
    is_private tinyint(1)       not null    default 0,
    view_count int  unsigned    not null    default '0',
    created_at datetime         not null,
    updated_at datetime         not null,
    deleted_at datetime         null,
    user_id    binary(16)       not null,
    constraint user_id_title_unique
        unique (user_id, title),
    constraint article_user_id_foreign
        foreign key (user_id) references user (id)
            on update cascade
);


-- COMMENT table
create table comment
(
    id         int  unsigned   not null    auto_increment  primary key,
    content    varchar(255)    not null,
    created_at datetime        not null,
    updated_at datetime        not null,
    deleted_at datetime        null,
    user_id    binary(16)      not null,
    article_id int unsigned    not null,
    constraint comment_article_id_foreign
        foreign key (article_id) references article (id)
            on update cascade,
    constraint comment_user_id_foreign
        foreign key (user_id) references user (id)
            on update cascade
);

