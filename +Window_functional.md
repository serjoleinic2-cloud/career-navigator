# +Window_functional.md

> Verified: 2026-07-11 — tab structure matches `BottomNavigation.tsx` and `App.tsx`

Нижнее меню

Я бы остановился на 5 вкладках.

Journey
Playbook
Notes
World
Profile

Именно в таком порядке.

Это максимально логично.

1. Journey ⭐⭐⭐⭐⭐

Это игра.

Это главный экран.

Здесь пользователь проводит 90% времени.

Что здесь:

текущий остров;
текущая глава;
текущие миссии;
прогресс главы;
кнопка Continue;
анимации.

Это тот экран, который сейчас называется World.

То есть:

World → Journey

2. Playbook

Это библиотека знаний.

Не обучение.

Не курс.

Именно справочник.

Например:

Resume

LinkedIn

Interview

Salary

Communication

STAR

Body language

Mistakes

Любое задание имеет кнопку

Learn more

которая открывает нужную страницу Playbook.

3. Notes

Тут всё правильно.

Но заметки должны быть привязаны к миссии.

Например

Resume

↓

Positioning Clarity

↓

Мои заметки

а не просто одна большая записная книжка.

4. World ⭐⭐⭐⭐⭐

Вот это очень сильная идея.

Именно её нам не хватало.

Это НЕ рабочий экран.

Это карта путешествия.

Как в Monument Valley.

Пользователь видит весь путь.

Offer

↑

Interview

↑

Applications

↑

LinkedIn

↑

Resume

Но красиво.

Большая карта.

Можно:

тапнуть

↓

посмотреть

что проходил.

Именно отсюда можно вернуться

например

к Resume

почитать свои Notes

пересмотреть Playbook

вспомнить материалы.

5. Profile

Именно сюда должен переехать Share.

Почему?

Потому что Share — это не экран.

Это действие.

А Profile — полноценный раздел.

Profile

Не обычный профиль.

Это

Паспорт путешественника.

Например

Explorer

Level 8

Software Engineer

Journey

31%


Ниже

Career Score

Confidence

Readiness

Consistency

Interview Readiness

Ниже

Achievements

Ниже

Visited Islands

✓ Resume

✓ LinkedIn

□ Applications

Ниже

Statistics
Где теперь Share?

Внутри Profile.

Кнопка

Share Progress

или

Create Journey Card

Она открывает красивую открытку.

Например

Career Navigator

Software Engineer

Journey 42%

Current Island

Interview

Career Score

78

Confidence

83


Именно эту картинку человек публикует.

Что делать с шестерёнкой?

Я бы НЕ делал настройки отдельной вкладкой.

Шестерёнка остаётся справа сверху.

Но это не просто Settings.

Это

Settings

↓

Language

Theme

Notifications

Backup

Restore

Privacy

About

Developer Mode

И ВСЁ.

Что бы я убрал

Я бы вообще убрал экран Share.

Он не нужен.

Share — это кнопка.

Не экран.

Финальная структура
Journey
      ↑
      │
Playbook
      │
Notes
      │
World
      │
Profile

Это очень сильная структура, потому что у каждой вкладки есть своя роль, и они не конкурируют друг с другом:

Journey — "Что я делаю сейчас?"
Playbook — "Как это сделать лучше?"
Notes — "Что я записал?"
World — "Где я нахожусь в путешествии?"
Profile — "Кто я и каких результатов достиг?"
И последнее, что я бы изменил

Экран World не должен быть просто списком островов. Он должен вызывать желание открыть приложение даже без выполнения заданий.

Представь: пользователь закончил Resume, открывает World и впервые видит, что далеко впереди, среди облаков, сияет огромный город Offer, а между ним и текущим островом тянется цепочка парящих платформ и мостов. Он ещё не может туда попасть, но уже видит конечную цель. Именно это создаёт ощущение настоящего путешествия, а не прохождения чек-листа. Это будет одна из самых сильных эмоциональных особенностей Career Navigator.