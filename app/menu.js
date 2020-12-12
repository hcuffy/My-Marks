import { app, Menu } from 'electron';
import { customMenuTranslation } from './utils/translationUtil';

export default class MenuBuilder {

  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const locale = app.getLocale().slice(0, 2);
    const subMenuAbout = {
      label: 'Marks',
      submenu: [
        {
          label: customMenuTranslation(locale, 'about'),
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        {
          label: customMenuTranslation(locale, 'hide'),
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: customMenuTranslation(locale, 'others'),
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { type: 'separator' },
        {
          label: customMenuTranslation(locale, 'quit'),
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };

    const subMenuViewDev = {
      label: customMenuTranslation(locale, 'view'),
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: customMenuTranslation(locale, 'toggle'),
          accelerator: 'Ctrl+Command+F',
          click: () => {
            if (!this.mainWindow.isDestroyed()) {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: customMenuTranslation(locale, 'view'),
      submenu: [
        {
          label: customMenuTranslation(locale, 'toggle'),
          accelerator: 'Ctrl+Command+F',
          click: () => {
            if (!this.mainWindow.isDestroyed()) {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
            }
          }
        }
      ]
    };
    const subMenuWindow = {
      label: customMenuTranslation(locale, 'window'),
      submenu: [
        {
          label: customMenuTranslation(locale, 'mini'),
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: customMenuTranslation(locale, 'close'),
          accelerator: 'Command+W',
          selector: 'performClose:'
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [subMenuAbout, subMenuView, subMenuWindow];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O'
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                }
              ]
      }
    ];

    return templateDefault;
  }
}
