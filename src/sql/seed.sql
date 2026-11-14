insert into public.todos (user_id, title, content, due_date, due_time, done)
select u.id, v.title, v.content, v.due_date::date, v.due_time::time, v.done
from auth.users u
cross join (values
  ('Supabase에서 넣은 할 일', '조회 테스트', '2026-11-20', '10:30', false),
  ('날짜 없는 할 일', '', null, null, false),
  ('이미 끝낸 할 일', '', '2026-11-18', null, true)
) as v(title, content, due_date, due_time, done)
where u.email = '여기에_내_이메일';