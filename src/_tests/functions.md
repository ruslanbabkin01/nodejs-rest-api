- describe(title, callback) - описує групу тестів
- beforeEach(callback) - виконати callback перед кожним тестом
- afterEach (callback) - виконати callback після кожного тесту 
- beforeAll (callback) - виконати callback перед групою тестів
- afterAll (callback) - виконати callback після групи тестів
- test або it(title) - тест


- not — інвертує наступне порівняння в ланцюжку.
- expect(func(arg)).toBe(value) — перевірка на строгу рівність отриманого значення value (===)
- expect(func(arg)).toEqual(value) — порівняння обєктів (не порівнює undefined)
- expect(func(arg)).toStrictEqual(value) — повне порівняння обєктів (порівнює undefined)
- expect(func(arg)).not.BeEqual(value) — логічне не
- expect(func(arg)).toBeTruthy() — перевіряє значення на те, що чи можна значення, що повертається вважати істинним
- expect(func(arg)).toBeNull() — перевіряє значення на рівність null
- expect(func(arg)).toBeUndefined() — перевіряє значення на undefined
- expect(func(arg)).toBeDefined() — перевіряє, що функція повертає щось


-it.skip() - пропустити тест в файлі
-it.only() - виконати тільки цей тест в файлі