
import { _electron as electron } from 'playwright';
import { test, expect, ElectronApplication, Page } from '@playwright/test';

test.describe('End-to-End tests', async() => {
    let electronApp: ElectronApplication;
    let firstWindow: Page;

    test.beforeAll(async() => {
        electronApp = await electron.launch({ args: ['.']} );
        firstWindow = await electronApp.firstWindow();
    });

    test('Initial window is loaded successfully', async ( { page }) => {
		const windowState: {
			isVisible: boolean;
			isCrashed: boolean;
		} = await electronApp.evaluate(async ({ BrowserWindow }) => {
			const mainWindow = BrowserWindow.getAllWindows()[0];

			const getState = () => ({
			  isVisible: mainWindow.isVisible(),
			  isCrashed: mainWindow.webContents.isCrashed(),
			});

			return new Promise((resolve) => {
				if (mainWindow.isVisible()) {
					resolve(getState());
				} else {
					mainWindow.once("ready-to-show", () => setTimeout(() => resolve(getState()), 0));
				}
			});
		});

		expect(windowState.isVisible).toBeTruthy();
		expect(windowState.isCrashed).toBeFalsy();
    });

    test('Run button is clickable and is disabled when code is running', async () => {
		await firstWindow.locator('#btn-run').click();
		await expect(firstWindow.locator('#btn-run')).toBeDisabled()
    });

    test('Terminate button is visible when Run button is clicked', async () => {
		await firstWindow.locator('#btn-run').click();
		await expect(firstWindow.locator('#btn-stop')).toBeVisible()
    });

    test('Clicking menu button expands the menu', async () => {
		await firstWindow.locator('#btn-collapse').click();
		await expect(firstWindow.locator('#font-size-selector')).toBeVisible()
		await expect(firstWindow.locator('#font-selector')).toBeVisible()
		await expect(firstWindow.locator('#theme-selector')).toBeVisible()
    });

    test('Changing colour scheme using', async () => {
		await firstWindow.selectOption("#theme-selector", {
			index: 5 // matrix theme applied
			// inspect visually
		})
    });

    test.afterAll(async() => {
        await electronApp.close();
    });

});
