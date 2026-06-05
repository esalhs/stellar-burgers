import { test, expect } from '@playwright/test';

test.describe('конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/**',
      update: false
    });
    await page.goto('/');
  });

  test('добавление булки', async ({ page }) => {
    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(page.getByTestId('constructor-bun-top')).toContainText(
      'Краторная булка N-200i'
    );
  });

  test('добавление ингредиента', async ({ page }) => {
    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Биокотлета из марсианской Магнолии'
    );
  });

  test('открытие модального окна', async ({ page }) => {
    await page.getByTestId('ingredient-643d69a5c3f7b9001cfa0941').click();
    await expect(page.getByTestId('modal')).toContainText(
      'Биокотлета из марсианской Магнолии'
    );
  });

  test('закрытие по клику на крестик', async ({ page }) => {
    await page.getByTestId('ingredient-643d69a5c3f7b9001cfa0941').click();
    await expect(page.getByTestId('modal')).toBeVisible();

    await page.getByTestId('close-button').click();
    await expect(page.getByTestId('modal')).not.toBeVisible();
  });

  test('закрытие по клику на оверлей', async ({ page }) => {
    await page.getByTestId('ingredient-643d69a5c3f7b9001cfa0941').click();
    await expect(page.getByTestId('modal')).toBeVisible();

    await page.getByTestId('overlay').dispatchEvent('click');
    await expect(page.getByTestId('modal')).not.toBeVisible();
  });
});

test.describe('создание заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.routeFromHAR('./tests/hars/app.har', {
      url: '**/api/ingredients**',
      update: false
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'fake-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await page.route('**/api/auth/user', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: './tests/hars/user.json'
      });
    });

    await page.route('**/api/orders', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: './tests/hars/order.json'
      });
    });

    await page.goto('/');
  });

  test('создание заказа', async ({ page }) => {
    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa093c')
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page
      .getByTestId('ingredient-643d69a5c3f7b9001cfa0941')
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page.getByTestId('order-button').click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('modal')).toContainText('12345');

    await page.getByTestId('close-button').click();
    await expect(page.getByTestId('modal')).not.toBeVisible();

    await expect(page.getByTestId('constructor-bun-top')).not.toBeVisible();
  });

  test.afterEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
});
