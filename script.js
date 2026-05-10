// script.js

function parseLRC(raw) {
  const result = [], re = /\[(\d{2}):(\d{2}[.,]\d+)\]/g;
  for (const line of raw.trim().split("\n")) {
    if (/^\[(?:ti|ar|al|by|lang|offset|au|length|id|re|ve):/.test(line)) continue;
    const text = line.replace(/\[\d{2}:\d{2}[.,]\d+\]/g, "").trim();
    if (!text) continue;
    let m; re.lastIndex = 0;
    while ((m = re.exec(line)) !== null)
      result.push({ time: +m[1]*60 + parseFloat(m[2].replace(",",".")), text });
  }
  return result.sort((a,b) => a.time - b.time);
}
function fmt(s, ms=false) {
  if (!s || isNaN(s)) return ms ? "0:00.00" : "0:00";
  const m = Math.floor(s/60), sec = s % 60;
  return ms
    ? `${m}:${String(Math.floor(sec)).padStart(2,"0")}.${String(Math.floor((sec%1)*100)).padStart(2,"0")}`
    : `${m}:${String(Math.floor(sec)).padStart(2,"0")}`;
}
function toTag(s) {
  const m = Math.floor(s/60), sec = s % 60;
  return `[${String(m).padStart(2,"0")}:${String(Math.floor(sec)).padStart(2,"0")}.${String(Math.floor((sec%1)*100)).padStart(2,"0")}]`;
}

// ════════════════════════════════════════════════════════════
//  ДАННЫЕ ПЕСЕН
//  coverFocus: "top" | "center" | "bottom"  (object-position)
// ════════════════════════════════════════════════════════════
const songs = [

  // ── HIM — Join Me In Death ─────────────────────────────
  {
    title:"Join Me In Death", artist:"HIM",
    audio:"assets/songs/join-me.mp3",
    cover:"assets/covers/join-me.jpg",
    coverFocus:"100% 40%",
    theme:{ bg:"#1f0c0c", accent:"#c0392b" },
    tr:{
      "Baby join me in death":                 "Малышка, присоединись ко мне в смерти",
      "We are so young":                       "Мы ещё так молоды",
      "Our lives have just begun":             "Наша жизнь только началась",
      "But already we're considering":         "Но мы уже думаем",
      "Escape from this world":                "О том, чтоб сбежать из этого мира",
      "And we've waited for so long":          "И мы так долго ждали",
      "For this moment to come":               "Когда наступит этот миг",
      "We're so anxious to be together":       "Нам не терпится быть вместе",
      "Together in death":                     "Вместе — в смерти",
      "Won't you die tonight for love?":       "Умрёшь ли ты сегодня ради любви?",
      "Won't you die?":                        "Умрёшь ли ты?",
      "This world is a cruel place":           "Этот мир — жестокое место",
      "And we're here only to lose":           "И мы здесь лишь для того, чтобы терять",
      "So before life tears us apart":         "Так что пока жизнь не разлучит нас,",
      "Let death bless me with you":           "Позвлю смерти благословить меня тобой",
      "So will you die?":                      "Так умрёшь ли ты?",
      "Will you die tonight for love":         "Умрёшь ли ты сегодня ради любви?",
      "Join me in death":                      "Присоединись ко мне в смерти",
      "This life ain't worth living":          "Эта жизнь не стоит того, чтоб жить",
    },
    // Тайминги точные из lyricsify до 2:00,
    // после 2:00 — структура: куплет повторяется, далее bridge, затем финальные хорусы
    lrcRaw:`
[00:05.04]Baby join me in death
[00:13.16]Baby join me in death
[00:21.96]Baby join me in death
[00:30.01]We are so young
[00:32.70]Our lives have just begun
[00:36.73]But already we're considering
[00:41.22]Escape from this world
[00:45.47]And we've waited for so long
[00:49.82]For this moment to come
[00:53.83]We're so anxious to be together
[00:57.74]Together in death
[01:02.03]Won't you die tonight for love?
[01:08.19]Baby join me in death
[01:12.59]Won't you die?
[01:16.39]Baby join me in death
[01:20.86]Won't you die tonight for love?
[01:25.06]Baby join me in death
[01:32.93]This world is a cruel place
[01:36.04]And we're here only to lose
[01:40.04]So before life tears us apart
[01:44.02]Let death bless me with you
[01:50.17]Won't you die tonight for love?
[01:54.58]Baby join me in death
[01:58.60]Won't you die?
[02:02.40]Baby join me in death
[02:06.56]Won't you die tonight for love?
[02:10.09]Baby join me in death
[02:16.50]Join me in death
[02:28.00]This life ain't worth living
[02:36.00]This life ain't worth living
[02:44.00]This life ain't worth living
[02:53.50]This life ain't worth living
[02:57.00]Won't you die tonight for love?
[03:02.00]Baby join me in death
[03:06.00]So will you die?
[03:09.50]Baby join me in death
[03:15.00]Will you die tonight for love
[03:19.50]Baby join me in death
[03:23.00]Baby join me in death

[03:33.00]Dear Aruana...`
  },

  // ── Enjambre — Impacto ─────────────────────────────────
  {
    title:"Impacto", artist:"Enjambre",
    audio:"assets/songs/impacto.mp3",
    cover:"assets/covers/impacto.jpg",
    coverFocus:"center",
    theme:{ bg:"#aa2b4d", accent:"#f5e6d0" },
    tr:{
      "Esos brazos cruzados":                  "Эти скрещённые руки",
      "Y ese ceño enojado":                    "И этот сердитый взгляд",
      "Me tienen intrigado":                   "Меня очень интригуют",
      "Me intimidas, ¿qué hago?":              "Ты пугаешь меня — что мне делать?",
      "Y si das un paso me pones a llorar":    "Стоит тебе шагнуть — и я заплачу",
      "Y si caminas más al suelo voy a dar":   "А пройдёшь ещё немного — и я упаду",
      "No me mires con esos ojos":             "Не смотри на меня этими блестящими глазами",
      "(Que me) Me deslumbras":                "Которые меня ослепляют",
      "(Que me) Me derrumbas":                 "Которые меня разрушают",
      "(Porque) Te lo doy todo":               "Ведь я отдаю тебе всё",
      "(Oh, no) Ni modo":                      "О нет, ничего не могу поделать",
      "(Que me) Me derrites":                  "Которые меня плавят",
      "(Que me) Me transmites":                "Которые меня заставляют чувствовать",
      "La vergüenza de el sol":                "Стыд самого солнца",
      "Que en su resplandor":                  "Которое в своём сиянии",
      "Se ve opacado a tu lado":               "Меркнет рядом с тобой",
      "Se escucha una melodía":                "Слышна мелодия",
      "El canto de esa niña":                  "Пение этой девушки",
      "Y burbujea la sangre":                  "И бурлит кровь",
      "Que corre por mis venas":               "Бегущая по моим венам",
      "Y apenas si me ves":                    "И едва ты взглянешь на меня",
      "Me tumbas del impacto":                 "Как сбиваешь меня с ног",
      "Y te echas a reír":                     "И начинаешь смеяться",
      "Me da un paro cardíaco":                "У меня останавливается сердце",
    },
    // Точные тайминги lyricsify. После 3:25 текст не идёт — удалён.
    lrcRaw:`
[00:11.62]Esos brazos cruzados
[00:15.06]Y ese ceño enojado
[00:19.89]Me tienen intrigado
[00:22.98]Me intimidas, ¿qué hago?
[00:28.72]Y si das un paso me pones a llorar
[00:33.32]Y si caminas más al suelo voy a dar
[00:54.68]No me mires con esos ojos
[00:58.75](Que me) Me deslumbras
[01:00.73](Que me) Me derrumbas
[01:03.98]No me mires con esos ojos
[01:07.32](Porque) Te lo doy todo
[01:09.82](Oh, no) Ni modo
[01:13.07]No me mires con esos ojos
[01:16.23](Que me) Me derrites
[01:18.95](Que me) Me transmites
[01:21.75]La vergüenza de el sol
[01:24.15]Que en su resplandor
[01:27.03]Se ve opacado a tu lado
[01:52.64]Se escucha una melodía
[01:57.24]El canto de esa niña
[02:01.64]Y burbujea la sangre
[02:06.02]Que corre por mis venas
[02:09.25]Y apenas si me ves
[02:11.69]Me tumbas del impacto
[02:13.84]Y te echas a reír
[02:16.17]Me da un paro cardíaco
[02:27.49]No me mires con esos ojos
[02:31.31](Que me) Me deslumbras
[02:33.93](Que me) Me derrumbas
[02:36.84]No me mires con esos ojos
[02:40.18](Porque) Te lo doy todo
[02:42.53](Oh, no) Ni modo
[02:45.67]No me mires con esos ojos
[02:49.02](Que me) Me derrites
[02:51.63](Que me) Me transmites
[02:54.67]La vergüenza de el sol
[02:57.08]Que en su resplandor
[03:00.05]Se ve opacado a tu lado
[03:25.00]No me mires con esos ojos

[03:40.00]I'm still waiting...`
  },

  // ── МакSим — Отпускаю ─────────────────────────────────
  // Текст начинается с 0:18. Первый слог вокала ~18с.
  {
    title:"Отпускаю", artist:"МакSим",
    audio:"assets/songs/otpuskayu.mp3",
    cover:"assets/covers/otpuskayu.jpg",
    coverFocus:"center",
    theme:{ bg:"#a0c0109d", accent:"#c8a96e" },
    tr:{},
    lrcRaw:`
[00:18.00]Я не могу дышать, мне не видно неба
[00:23.00]Я не могу понять: был ты или не был?
[00:27.00]Ветром по волосам, солнце в ладони
[00:30.50]Твоя
[00:34.00]Красные облака, вечер ударил в спину
[00:38.30]Я с тобой так легка, я с тобой красива
[00:44.00]Бешено так в груди бьётся сердце твоё
[00:52.00]Отпускаю, и в небо улетает
[00:58.00]С жёлтыми листьями наше прошлое лето
[01:04.20]С телефонными глупыми письмами
[01:07.50]Отпускаю, и слёзы высыхают на ресницах
[01:16.50]Но как же синие звёзды
[01:20.50]Нам с тобой могли присниться
[01:33.00]Рано ещё, ни будь поздно уже поверить
[01:37.50]Я не могла любить, я не могла измерить
[01:42.00]Месяцы за окном, солнце в закатах с тобой
[01:51.00]И отпускаюсь вниз и поднимаюсь в небо
[01:53.50]Я не могу понять: был ты или не был?
[01:58.50]В сотнях ночных дорог ты остаёшься со мной
[02:06.50]Отпускаю, и в небо улетает
[02:11.50]С жёлтыми листьями наше прошлое лето
[02:18.50]С телефонными глупыми письмами
[02:23.00]Отпускаю, и слёзы высыхают на ресницах
[02:31.00]Но как же синие звёзды
[02:35.00]Нам с тобой могли присниться
[03:11.50]Отпускаю, и в небо улетает
[03:17.00]С жёлтыми листьями наше прошлое лето
[03:24.00]С телефонными глупыми письмами
[03:28.00]Отпускаю, и слёзы высыхают на ресницах
[03:35.50]Но как же синие звёзды
[03:39.50]Нам с тобой могли присниться?
[03:54.00]Я не могу дышать, мне не видно неба
[03:59.40]Я не могу понять: был ты или не был?
[04:04.00]Ветром по волосам, солнце в ладони
[04:08.00]Твоя

[04:12.00]Your smile colors the world, my world. Don't lose it, please.`
  },

  // ── МакSим — Ветром стать ─────────────────────────────
  // Текст начинается с 0:31. Вступление инструментальное ~31с.
  {
    title:"Ветром стать", artist:"МакSим",
    audio:"assets/songs/vetrom-stat.mp3",
    cover:"assets/covers/vetrom-stat.jpg",
    coverFocus:"center",
    theme:{ bg:"#8d400c", accent:"#ff6b35" },
    tr:{},
    lrcRaw:`
[00:31.00]Когда я умру — я стану ветром
[00:34.00]И буду жить над твоей крышей
[00:37.00]Когда ты умрёшь, ты станешь солнцем
[00:39.00]И всё равно меня будешь выше
[00:42.00]Осенним ветром я буду где-то
[00:44.40]Летать с тобой ветром по свету
[00:47.00]Ты не поймёшь, а я незаметно
[00:50.00]Шепну теплом: «Ах, солнце, где ты?»
[00:55.00]Только ты не будь пока солнцем
[00:57.00]Слышишь, я буду петь тебе песни с крыш
[01:01.00]Я буду снова той, кем ты дышишь
[01:03.50]Осталось ветром лишь стать
[01:06.40]Я буду ждать лишь твоей улыбки
[01:08.50]И буду слушать твои пластинки
[01:11.50]С твоих ресниц собирать снежинки
[01:13.50]Осталось ветром лишь стать
[01:37.00]Когда я умру — я стану ветром
[01:39.00]На землю падать первым снегом
[01:41.50]Смеясь летать с тобой по свету
[01:44.50]И нет счастливей в мире этом
[01:47.50]Когда ты умрёшь, ты станешь солнцем
[01:50.00]И украдёшь мои морозы
[01:53.00]И зацветут в садах мимозы
[01:54.00]И сердца льдинки станут слёзы
[02:00.50]Только ты не будь пока солнцем
[02:02.30]Слышишь, я буду петь тебе песни с крыш
[02:05.50]Я буду снова той, кем ты дышишь
[02:08.00]Осталось ветром лишь стать
[02:10.50]Я буду ждать лишь твоей улыбки
[02:14.00]И буду слушать твои пластинки
[02:16.50]С твоих ресниц собирать снежинки
[02:19.40]Осталось ветром лишь стать
[02:21.50]Только ты не будь пока солнцем
[02:24.30]Слышишь, я буду петь тебе песни с крыш
[02:27.00]Я буду снова той, кем ты дышишь
[02:30.00]Осталось ветром лишь стать
[02:32.50]Я буду ждать лишь твоей улыбки
[02:35.00]И буду слушать твои пластинки
[02:37.50]С твоих ресниц собирать снежинки
[02:40.40]Осталось ветром лишь стать

[03:12.00]I'll always be ready to help you, just check it out.`
  },

  // ── Temper City — Self Aware ──────────────────────────
  // Правильный текст + точные тайминги lyricsify
  // Исправлено с 1:14 — вторая строфа правильная
  {
    title:"Self Aware", artist:"Temper City",
    audio:"assets/songs/self-aware.mp3",
    cover:"assets/covers/self-aware.jpeg",
    coverFocus:"center",
    theme:{ bg:"#1e2a41", accent:"#7eb8d4" },
    tr:{
      "No smoke without fire":                                    "Нет дыма без огня",
      "No silence if there's no sound":                           "Нет тишины, если нет звука",
      "One way or another":                                       "Так или иначе",
      "You're going to put me out":                               "Ты выведешь меня из себя",
      "Drinks flowing like water":                                "Напитки льются рекой",
      "Too drunk to turn off the light":                          "Слишком пьян, чтоб выключить свет",
      "Stay under the covers":                                    "Останемся под одеялом",
      "Who knows how we'll end the night":                        "Кто знает, чем закончится ночь",
      "Just don't hang your hopes on me":                         "Только не возлагай надежды на меня",
      "I want to feel something":                                 "Мне так хочется что-нибудь почувствовать",
      "God you look so pretty when you tell me that you love me": "Боже, как ты красива, когда говоришь, что любишь меня",
      "I wish that I could lie":                                  "Желаю, чтоб я мог лгать",
      "But my mind gets in the way":                              "Но мой разум встаёт на пути",
      "I know you think that I'm":                                "Я знаю, ты думаешь, что я",
      "Always way too self aware":                                "Всегда слишком много копаюсь в себе",
      "Oh we could never":                                        "О, нам никогда",
      "Be together":                                              "Не быть вместе",
      "But it's nice to play pretend":                            "Но притворяться — это так приятно",
      "But I'm way too self aware":                               "Но я слишком много копаюсь в себе",
      "Mood swings like the weather":                             "Настроение меняется как погода",
      "Body's under pressure":                                    "Тело под давлением",
      "Oh I love the way you're using your imagination":          "О, мне нравится, как ты используешь воображение",
      "Laws of attraction":                                       "Законы притяжения",
      "Put 'em into practice":                                    "Применяй их на практике",
    },
    lrcRaw:`
[00:15.18]No smoke without fire
[00:18.13]No silence if there's no sound
[00:21.07]One way or another
[00:24.07]You're going to put me out
[00:27.02]Drinks flowing like water
[00:30.03]Too drunk to turn off the light
[00:32.94]Stay under the covers
[00:35.89]Who knows how we'll end the night
[00:38.50]Just don't hang your hopes on me
[00:41.72]I want to feel something
[00:44.45]God you look so pretty when you tell me that you love me
[00:51.13]I wish that I could lie
[00:54.06]But my mind gets in the way
[00:57.11]I know you think that I'm
[01:00.03]Always way too self aware
[01:02.65]Oh we could never
[01:04.45]Be together
[01:05.97]But it's nice to play pretend
[01:08.94]I wish that I could lie
[01:11.90]But I'm way too self aware
[01:14.46]Mood swings like the weather
[01:16.32]Body's under pressure
[01:18.24]Oh I love the way you're using your imagination
[01:21.09]Laws of attraction
[01:22.95]Put 'em into practice
[01:26.00]Just don't hang your hopes on me
[01:28.80]I want to feel something
[01:32.00]God you look so pretty when you tell me that you love me
[01:38.51]I wish that I could lie
[01:41.30]But my mind gets in the way
[01:44.36]I know you think that I'm
[01:47.00]Always way too self aware
[01:49.83]Oh we could never
[01:52.00]Be together
[01:53.00]But it's nice to play pretend
[01:56.40]I wish that I could lie
[01:58.50]But I'm way too self aware
[02:13.00]Just don't hang your hopes on me
[02:16.50]I want to feel something
[02:18.55]God you look so pretty when you tell me that you love me
[02:28.50]I wish that I could lie
[02:31.00]But my mind gets in the way
[02:35.00]I know you think that I'm
[02:37.78]Always way too self aware
[02:40.00]Oh we could never
[02:42.00]Be together
[02:43.77]But it's nice to play pretend
[02:47.00]I wish that I could lie
[02:49.64]But I'm way too self aware

[02:53.60]I may be a fool sometimes, but I'm not blind. I'm sorry that I push you sometimes. I'm doing this unconsciously.`
  },

  // ── The Neighbourhood — Flawless ─────────────────────
  // Текст начинается с 0:19. Тайминги скорректированы.
  {
    title:"Flawless", artist:"The Neighbourhood",
    audio:"assets/songs/flawless.mp3",
    cover:"assets/covers/flawless.jpg",
    coverFocus:"100% 40%",
    theme:{ bg:"#5e0b69", accent:"#e8729a" },
    tr:{  
      "She planned ahead for a year":                               "Она строила планы на год вперёд",
      "He said, \"Let's play it by ear\"":                          "Он говорил — \"Поживем-увидим\"",
      "She didn't want him to run":                                 "Она не хотела, чтоб он сбежал",
      "He didn't want her to fear":                                 "Он не хотел, чтоб она боялась",
      "Nobody said it'd be easy":                                   "Никто не говорил, что будет легко",
      "They knew it was rough, but tough luck":                     "Они знали, что это сложно, но что поделать",
      "I fell in love today":                                       "Я влюбился сегодня",
      "There aren't many words that you can say":                   "Нет таких слов на свете",
      "That could ever get my mind to change":                      "Что смогли бы изменить мой разум",
      "She's enough for me, she's in love with me":                 "Мне достаточна лшиь её, и она любит меня",
      "You're a doll, you are flawless":                            "Ты - идеал, ты безупречна",
      "But I just can't wait for love to destroy us":               "Но я просто не могу ждать, когда любовь разрушит нас",
      "I just can't wait for love":                                 "Я не могу дождаться любви",
      "The only flaw, you are flawless":                            "Единственный недостаток — ты безупречна",
      "So, she put his heart in a bag":                             "Она положила его сердце в сумку",
      "He wouldn't ask for it back":                                "И он не просил вернуть",
      "He didn't want her to cry":                                  "Он не хотел видеть её слёз",
      "She didn't want to be sad":                                  "Она не хотела быть грустной",
      "She said, \"you better not leave me\"":                      "Она сказала — \"Тебе лучше не оставлять меня\"",
      "This shit'll be fucked for days and weeks and months, but":  "Это дерьмо затянется на дни, недели и месяцы, но",
      "When I add it all up":                                       "Стоит мне сложить всё",
      "I can find it":                                              "Я смогу найти это",
      "The problem with love is I'm blinded by":                    "Проблема с любовью — моя ослепленность ею",
      "It rattles my lungs":                                        "От неё перехватывает дыхание",
      "But my mind is":                                             "Но мой разум",
      "Tangled between your little flaws":                          "Запутался между твоими маленькими недостатками",
      "Your flaws":                                                 "Твои недостатки",
      "Wait for love":                                              "Ждать любви",
      "I won't wait for love":                                      "Я не буду ждать любви",
    },
    lrcRaw:`
[00:18.50]She planned ahead for a year
[00:21.00]He said, "Let's play it by ear"
[00:22.80]She didn't want him to run
[00:25.00]He didn't want her to fear
[00:27.00]Nobody said it'd be easy
[00:29.80]They knew it was rough, but tough luck
[00:34.60]I fell in love today
[00:37.40]There aren't many words that you can say
[00:41.50]That could ever get my mind to change
[00:45.50]She's enough for me, she's in love with me
[00:53.00]You're a doll, you are flawless
[01:00.00]But I just can't wait for love to destroy us
[01:04.50]I just can't wait for love
[01:08.70]The only flaw, you are flawless
[01:16.60]But I just can't wait for love to destroy us
[01:20.50]I just can't wait for love
[01:24.00]So, she put his heart in a bag
[01:27.00]He wouldn't ask for it back
[01:28.70]He didn't want her to cry
[01:31.00]She didn't want to be sad
[01:32.80]She said, "you better not leave me"
[01:35.80]This shit'll be fucked for days and weeks and months, but
[01:40.00]I fell in love today
[01:43.50]There aren't many words that you can say
[01:47.00]That could ever get my mind to change
[01:52.00]She's enough for me, she's in love with me
[01:59.00]You're a doll, you are flawless
[02:05.60]But I just can't wait for love to destroy us
[02:10.50]I just can't wait for love
[02:15.00]The only flaw, you are flawless
[02:21.60]But I just can't wait for love to destroy us
[02:26.50]I just can't wait for love
[02:31.00]When I add it all up 
[02:33.00]I can find it
[02:35.00]The problem with love is I'm blinded by
[02:39.50]It rattles my lungs
[02:41.00]But my mind is 
[02:43.70]Tangled between your little flaws
[02:49.50]Your flaws
[02:53.50]Your flaws
[02:58.00]Your flaws
[03:05.00]You're a doll, you are flawless
[03:12.00]But I just can't wait for love to destroy us
[03:16.20]I just can't wait for love
[03:21.00]The only flaw, you are flawless
[03:28.00]But I just can't wait for love to destroy us
[03:32.60]I just can't wait for love
[03:36.00]Wait for love
[03:39.00]I won't wait for love
[03:44.00]Wait for love
[03:47.00]I won't wait for love
[03:52.00]Wait for love

[03:55.00]Just remember that silence is not an option. But we could be silent together)`
  }
];

songs.forEach(s => { s.lyrics = parseLRC(s.lrcRaw); });

// ── DOM ────────────────────────────────────────────────────
const songsList      = document.getElementById("songsList");
const coverImage     = document.getElementById("coverImage");
const songTitleEl    = document.getElementById("songTitle");
const songArtistEl   = document.getElementById("songArtist");
const lyricsEl       = document.getElementById("lyrics");
const lyricsViewport = document.querySelector(".lyrics-viewport");
const currentSongEl  = document.getElementById("currentSong");
const audio          = document.getElementById("audio");
const playButton     = document.getElementById("playButton");
const prevButton     = document.getElementById("prevButton");
const nextButton     = document.getElementById("nextButton");
const progressBar    = document.getElementById("progressBar");
const progressFill   = document.getElementById("progressFill");
const timeCurrentEl  = document.getElementById("timeCurrentEl");
const timeTotalEl    = document.getElementById("timeTotalEl");

// Beat canvas
const beatCanvas = document.createElement("canvas");
beatCanvas.id = "beatCanvas"; beatCanvas.height = 48;
beatCanvas.style.cssText = `position:absolute;bottom:0;left:0;right:0;width:100%;
  pointer-events:none;opacity:0;transition:opacity .6s;border-radius:0 0 30px 30px;`;
document.querySelector(".player").appendChild(beatCanvas);

let audioCtx=null, analyser=null, freqData=null, audioReady=false;
function initAudio(){
  if(audioReady)return; audioReady=true;
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  analyser=audioCtx.createAnalyser();
  analyser.fftSize=512; analyser.smoothingTimeConstant=0.82;
  const src=audioCtx.createMediaElementSource(audio);
  src.connect(analyser); analyser.connect(audioCtx.destination);
  freqData=new Uint8Array(analyser.frequencyBinCount);
  beatCanvas.style.opacity="1";
  drawBeat();
}
function drawBeat(){
  requestAnimationFrame(drawBeat);
  if(!analyser)return;
  analyser.getByteFrequencyData(freqData);
  beatCanvas.width=beatCanvas.offsetWidth;
  const W=beatCanvas.width,H=beatCanvas.height,ctx=beatCanvas.getContext("2d");
  ctx.clearRect(0,0,W,H);
  const bins=72,barW=W/(bins*2);
  const accent=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,accent); g.addColorStop(1,"transparent"); ctx.fillStyle=g;
  for(let i=0;i<bins;i++){
    const v=freqData[i]/255,bH=v*H*1.15;
    ctx.globalAlpha=0.5+v*0.5;
    ctx.fillRect(W/2+i*barW,H-bH,barW-1,bH);
    ctx.fillRect(W/2-(i+1)*barW,H-bH,barW-1,bH);
  }
}

// ── Плавный скролл ─────────────────────────────────────────
let scrollY=0, targetScrollY=0, rafScroll=null;
function animateScroll(){
  const diff=targetScrollY-scrollY;
  if(Math.abs(diff)<0.5){ scrollY=targetScrollY; lyricsEl.style.transform=`translateY(${-scrollY}px)`; rafScroll=null; return; }
  scrollY+=diff*0.1;
  lyricsEl.style.transform=`translateY(${-scrollY}px)`;
  rafScroll=requestAnimationFrame(animateScroll);
}
function scrollToActive(idx){
  const line=lyricsEl.querySelector(`.line[data-index="${idx}"]`);
  if(!line)return;
  targetScrollY=Math.max(0, line.offsetTop - lyricsViewport.clientHeight/2 + line.offsetHeight/2);
  if(!rafScroll) rafScroll=requestAnimationFrame(animateScroll);
}

// ── Songs ──────────────────────────────────────────────────
let activeSongIndex=null, activeLineIdx=-1;

function renderSongs(){
  songsList.innerHTML="";
  songs.forEach((song,i)=>{
    const card=document.createElement("div");
    card.className="song-card"; card.dataset.index=i;
    card.innerHTML=`<img src="${song.cover}" alt="${song.title}" style="object-position:${song.coverFocus || 'center'}">
      <div class="song-info"><div class="song-title">${song.title}</div><div class="song-artist">${song.artist}</div></div>`;
    card.addEventListener("click",()=>loadSong(i));
    songsList.appendChild(card);
  });
}
function highlightCard(){
  document.querySelectorAll(".song-card").forEach(c=>c.classList.remove("active"));
  const c=document.querySelector(`.song-card[data-index="${activeSongIndex}"]`);
  if(c){c.classList.add("active");c.scrollIntoView({behavior:"smooth",block:"nearest"});}
}
function buildLyrics(song){
  lyricsEl.innerHTML="";
  scrollY=0; targetScrollY=0; lyricsEl.style.transform="translateY(0)";
  song.lyrics.forEach((line,idx)=>{
    const div=document.createElement("div");
    div.className="line"; div.dataset.index=idx;
    const tr=song.tr?.[line.text]??"";
    div.innerHTML=`<div class="original">${line.text}</div>${tr?`<div class="translation">${tr}</div>`:""}`;
    lyricsEl.appendChild(div);
  });
}
function loadSong(index,autoplay=false){
  const song=songs[index];
  activeSongIndex=index; activeLineIdx=-1;
  audio.src=song.audio;
  audio.load();
  playButton.textContent="▶";
  // Обложка: задаём через CSS-переменные — надёжнее чем inline style
  const focus = song.coverFocus || "center center";
  coverImage.src=song.cover;
  document.documentElement.style.setProperty("--cover-pos", focus);
  document.documentElement.style.setProperty("--cover-bg-url", `url('${song.cover}')`);
  songTitleEl.textContent=song.title;
  songArtistEl.textContent=song.artist;
  currentSongEl.textContent=`${song.title} • ${song.artist}`;
  document.documentElement.style.setProperty("--bg",song.theme.bg);
  document.documentElement.style.setProperty("--accent",song.theme.accent);
  progressFill.style.width="0%";
  timeCurrentEl.textContent="0:00"; timeTotalEl.textContent="0:00";
  buildLyrics(song);
  highlightCard();
  if(autoplay){
    audio.addEventListener("canplay",function onCanPlay(){
      audio.removeEventListener("canplay",onCanPlay);
      audio.play().then(()=>{playButton.textContent="❚❚";initAudio();}).catch(()=>{});
    },{once:true});
  }
}

// ── Controls ───────────────────────────────────────────────
playButton.addEventListener("click",()=>{
  if(audio.paused){audio.play();playButton.textContent="❚❚";initAudio();}
  else{audio.pause();playButton.textContent="▶";}
});
prevButton.addEventListener("click",()=>loadSong(((activeSongIndex??0)-1+songs.length)%songs.length,!audio.paused));
nextButton.addEventListener("click",()=>loadSong(((activeSongIndex??0)+1)%songs.length,!audio.paused));
audio.addEventListener("ended",()=>loadSong((activeSongIndex+1)%songs.length,true));

progressBar.addEventListener("click",e=>{
  if(!audio.duration||audio.readyState<1)return;
  const r=progressBar.getBoundingClientRect();
  audio.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*audio.duration;
});
let dragging=false;
progressBar.addEventListener("mousedown",e=>{dragging=true;doSeek(e);});
document.addEventListener("mousemove",e=>{if(dragging)doSeek(e);});
document.addEventListener("mouseup",()=>{dragging=false;});
function doSeek(e){
  if(!audio.duration||audio.readyState<1)return;
  const r=progressBar.getBoundingClientRect();
  audio.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*audio.duration;
}

// ── Timeupdate ─────────────────────────────────────────────
audio.addEventListener("timeupdate",()=>{
  if(activeSongIndex===null)return;
  const t=audio.currentTime, dur=audio.duration||0;
  if(dur) progressFill.style.width=`${(t/dur)*100}%`;
  timeCurrentEl.textContent=fmt(t);
  if(dur) timeTotalEl.textContent=fmt(dur);
  const lyrics=songs[activeSongIndex].lyrics;
  let newIdx=-1;
  for(let i=0;i<lyrics.length;i++){
    if(t>=lyrics[i].time&&(!lyrics[i+1]||t<lyrics[i+1].time)){newIdx=i;break;}
  }
  if(newIdx===activeLineIdx)return;
  activeLineIdx=newIdx;
  document.querySelectorAll(".line").forEach((el,idx)=>el.classList.toggle("active",idx===newIdx));
  if(newIdx>=0) scrollToActive(newIdx);
  // Синхронизируем редактор если открыт
  if(teOpen) teSyncHighlight(newIdx);
});
audio.addEventListener("loadedmetadata",()=>{ timeTotalEl.textContent=fmt(audio.duration); });

// ── Keyboard ───────────────────────────────────────────────
document.addEventListener("keydown",e=>{
  if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA") return;
  if(teOpen){
    if(e.key===" "||e.key==="Enter"){ e.preventDefault(); teMarkCurrent(); }
    return;
  }
  switch(e.key){
    case" ":         e.preventDefault(); playButton.click(); break;
    case"ArrowRight":e.preventDefault(); if(audio.readyState>=1) audio.currentTime=Math.min(audio.currentTime+5,audio.duration||0); break;
    case"ArrowLeft": e.preventDefault(); if(audio.readyState>=1) audio.currentTime=Math.max(audio.currentTime-5,0); break;
    case"ArrowUp":   e.preventDefault(); prevButton.click(); break;
    case"ArrowDown": e.preventDefault(); nextButton.click(); break;
    case"e":case"E": if(e.ctrlKey){e.preventDefault();teToggle();} break;
  }
});

// ════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════
//  РЕДАКТОР: ТАЙМИНГИ + ФОКУС ОБЛОЖКИ
// ════════════════════════════════════════════════════════════
const tePanel    = document.getElementById("timingEditor");
const teLinesEl  = document.getElementById("teLines");
const teTimeEl   = document.getElementById("teTime");
const tePlayBtn  = document.getElementById("tePlay");
const teExportBtn= document.getElementById("teExport");
const teCloseBtn = document.getElementById("teClose");
const teTabBtns  = document.querySelectorAll(".te-tab");
const teTabTimings = document.getElementById("teTabTimings");
const teTabCover   = document.getElementById("teTabCover");
const teCoverImg   = document.getElementById("teCoverImg");
const teCoverContainer = document.getElementById("teCoverContainer");
const teCrosshair  = document.getElementById("teCrosshair");
const teCoverValue = document.getElementById("teCoverValue");
const teCoverCopy  = document.getElementById("teCoverCopy");

let teOpen = false;
let teTimings = [];
let teCurrentLine = 0;
let teRafTime = null;

// ── Вкладки ────────────────────────────────────────────────
teTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    teTabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    teTabTimings.style.display = tab === "timings" ? "flex" : "none";
    teTabCover.style.display   = tab === "cover"   ? "flex" : "none";
    if (tab === "cover") teCoverLoad();
  });
});

// ── Открыть/закрыть ────────────────────────────────────────
function teToggle() {
  teOpen = !teOpen;
  tePanel.style.display = teOpen ? "flex" : "none";
  if (teOpen) {
    teBuild();
    teStartClock();
  } else {
    cancelAnimationFrame(teRafTime);
  }
}
teCloseBtn.addEventListener("click", () => { teOpen=false; tePanel.style.display="none"; cancelAnimationFrame(teRafTime); });
document.getElementById("teOverlay").addEventListener("click", () => { teOpen=false; tePanel.style.display="none"; cancelAnimationFrame(teRafTime); });

// ── Тайминги: построить список ─────────────────────────────
function teBuild() {
  if (activeSongIndex === null) return;
  const song = songs[activeSongIndex];
  teTimings = song.lyrics.map(l => l.time ?? null);
  teCurrentLine = 0;
  teLinesEl.innerHTML = "";

  song.lyrics.forEach((line, i) => {
    const row = document.createElement("div");
    row.className = "te-line"; row.dataset.i = i;
    row.innerHTML = `
      <span class="te-timestamp" id="te-ts-${i}">${teTimings[i] != null ? toTag(teTimings[i]) : "[--:--.--]"}</span>
      <span class="te-text">${line.text}</span>
      <button class="te-mark" title="Метка сейчас" data-i="${i}">●</button>`;
    row.addEventListener("click", e => {
      if (!e.target.classList.contains("te-mark")) { teCurrentLine = i; teSyncHL(i); }
    });
    row.querySelector(".te-mark").addEventListener("click", e => {
      e.stopPropagation(); teCurrentLine = i; teSetTiming(i, audio.currentTime);
    });
    teLinesEl.appendChild(row);
  });
  teSyncHL(0);
}

function teSetTiming(i, t) {
  teTimings[i] = t;
  const ts = document.getElementById(`te-ts-${i}`);
  if (ts) ts.textContent = toTag(t);
  const row = teLinesEl.querySelector(`.te-line[data-i="${i}"]`);
  if (row) row.classList.add("te-done");
  // Переходим к следующей строке
  if (i + 1 < teTimings.length) { teCurrentLine = i + 1; teSyncHL(i + 1); }
}

function teSyncHL(idx) {
  teLinesEl.querySelectorAll(".te-line").forEach((r, i) => r.classList.toggle("te-active", i === idx));
  const a = teLinesEl.querySelector(`.te-line[data-i="${idx}"]`);
  if (a) a.scrollIntoView({ block:"center", behavior:"smooth" });
}
// Alias used in timeupdate
const teSyncHighlight = teSyncHL;

// Mark current line at current playback time (Space/Enter in editor)
function teMarkCurrent() {
  teSetTiming(teCurrentLine, audio.currentTime);
}

function teStartClock() {
  if (teRafTime) cancelAnimationFrame(teRafTime);
  function tick() { teTimeEl.textContent = fmt(audio.currentTime, true); teRafTime = requestAnimationFrame(tick); }
  tick();
}

tePlayBtn.addEventListener("click", () => {
  if (audio.paused) { audio.play(); tePlayBtn.textContent = "❚❚"; initAudio(); }
  else { audio.pause(); tePlayBtn.textContent = "▶"; }
});

teExportBtn.addEventListener("click", () => {
  if (activeSongIndex === null) return;
  const song = songs[activeSongIndex];
  const lines = song.lyrics.map((l, i) =>
    teTimings[i] != null ? `${toTag(teTimings[i])}${l.text}` : `[??:??.??]${l.text}`
  ).join("\n");
  const full = `[ti:${song.title}]\n[ar:${song.artist}]\n\n${lines}`;
  navigator.clipboard.writeText(full).then(() => {
    teExportBtn.textContent = "✅ Скопировано!";
    setTimeout(() => teExportBtn.textContent = "📋 Скопировать LRC", 2000);
  });
});

// ── Фокус обложки ──────────────────────────────────────────
function teCoverLoad() {
  if (activeSongIndex === null) return;
  const song = songs[activeSongIndex];
  teCoverImg.src = song.cover;

  // Показываем текущий фокус
  const focus = song.coverFocus || "center center";
  teCoverValue.textContent = `"${focus}"`;

  // Парсим текущую позицию и рисуем прицел
  teCoverImg.onload = () => teUpdateCrosshairFromFocus(focus);
  if (teCoverImg.complete) teUpdateCrosshairFromFocus(focus);
}

function teUpdateCrosshairFromFocus(focus) {
  // focus: "50% 30%" или "center top" etc.
  const parts = focus.trim().split(/\s+/);
  const parseVal = (v, dim) => {
    if (v === "left" || v === "top")    return 0;
    if (v === "center")                  return 50;
    if (v === "right" || v === "bottom") return 100;
    return parseFloat(v) || 50;
  };
  const px = parseVal(parts[0] || "center", "x");
  const py = parseVal(parts[1] || "center", "y");
  teCrosshair.style.left = px + "%";
  teCrosshair.style.top  = py + "%";
}

teCoverContainer.addEventListener("click", e => {
  const rect = teCoverContainer.getBoundingClientRect();
  const px = Math.round(((e.clientX - rect.left) / rect.width)  * 100);
  const py = Math.round(((e.clientY - rect.top)  / rect.height) * 100);

  teCrosshair.style.left = px + "%";
  teCrosshair.style.top  = py + "%";

  const val = `${px}% ${py}%`;
  teCoverValue.textContent = `"${val}"`;

  // Применяем к текущей обложке в реальном времени
  if (activeSongIndex !== null) {
    document.documentElement.style.setProperty("--cover-pos", val);
    songs[activeSongIndex].coverFocus = val;
  }
});

teCoverCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(teCoverValue.textContent.replace(/"/g, "'").replace(/'/g,"").trim()).then(() => {
    teCoverCopy.textContent = "✅ Скопировано!";
    setTimeout(() => teCoverCopy.textContent = "📋 Копировать", 2000);
  });
});

// ── Lightbox обложки ───────────────────────────────────────
const coverLightbox     = document.getElementById("coverLightbox");
const coverLightboxImg  = document.getElementById("coverLightboxImg");
const coverLightboxClose = document.getElementById("coverLightboxClose");

function openCoverLightbox() {
  if (activeSongIndex === null) return;
  const song = songs[activeSongIndex];
  coverLightboxImg.src = song.cover;
  coverLightboxImg.style.objectPosition = song.coverFocus || "center";
  coverLightbox.classList.add("open");
  coverLightbox.setAttribute("aria-hidden", "false");
}
function closeCoverLightbox() {
  coverLightbox.classList.remove("open");
  coverLightbox.setAttribute("aria-hidden", "true");
}

coverImage.addEventListener("click", openCoverLightbox);
coverLightboxClose.addEventListener("click", closeCoverLightbox);
coverLightbox.querySelector(".cover-lightbox-backdrop").addEventListener("click", closeCoverLightbox);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && coverLightbox.classList.contains("open")) closeCoverLightbox();
});

// ── Init ───────────────────────────────────────────────────
renderSongs();
loadSong(0);
