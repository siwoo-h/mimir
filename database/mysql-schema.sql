-- USER table
create table user
(
    id            bigint unsigned auto_increment
        primary key,
    email         varchar(255) not null,
    nickname      varchar(255) not null,
    password      varchar(255) not null,
    registered_at json         not null,
    updated_at    datetime     not null,
    disabled_at   datetime     not null,
    constraint user_email_unique
        unique (email),
    constraint user_nickname_unique
        unique (nickname)
);

-- ARTICLE table
create table article
(
    id         bigint unsigned auto_increment
        primary key,
    title      varchar(255)         not null,
    content    varchar(255)         not null,
    is_private tinyint(1) default 0 not null,
    view_count int        default 0 not null,
    created_at datetime             not null,
    updated_at datetime             not null,
    deleted_at datetime             not null,
    user_id    bigint unsigned      not null,
    constraint article_user_id_foreign
        foreign key (user_id) references user (id)
            on update cascade
);

create index article_user_id_index
    on article (user_id);

-- COMMENT table
create table comment
(
    id         bigint unsigned auto_increment
        primary key,
    content    varchar(255)    not null,
    created_at json            not null,
    updated_at datetime        not null,
    deleted_at datetime        not null,
    user_id    bigint unsigned not null,
    article_id bigint unsigned not null,
    constraint comment_article_id_foreign
        foreign key (article_id) references article (id)
            on update cascade,
    constraint comment_user_id_foreign
        foreign key (user_id) references user (id)
            on update cascade
);

create index comment_article_id_index
    on comment (article_id);

create index comment_user_id_index
    on comment (user_id);

