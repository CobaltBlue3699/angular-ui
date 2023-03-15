import { Column } from './../../components/docs/docs.component';
import { Component } from '@angular/core';
import { Docs } from '../../components/docs/docs.component';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent {
  importAlert = `import { AlertModule } from '@johnson.lee/angular-ui';`;

  docses: Docs[] = [
    {
      name: `Services`,
      description: ``,
      columns: [
        {
          name: `AlertService`,
          description: `Service to open designed alert.`,
          methods: [
            {
              name: `success: AlertRef`,
              description: `open a success alert with designed styles.`,
              parameters: [
                {
                  name: `message: string`,
                  description: `Success message.`
                },
                {
                  name: `options?: AlertOption`,
                  description: `Options that controll alert instance's behavior. like title, dismissable...`
                }
              ],
              return: {
                name: `AlertRef`,
                description: `Reference to the newly-opened alert.`
              }
            },
            {
              name: `info: AlertRef`,
              description: `open an info alert with designed styles.`,
              parameters: [
                {
                  name: `message: string`,
                  description: `Message.`
                },
                {
                  name: `options?: AlertOption`,
                  description: `Options that controll alert instance's behavior. like title, dismissable...`
                }
              ],
              return: {
                name: `AlertRef`,
                description: `Reference to the newly-opened alert.`
              }
            },
            {
              name: `warning: AlertRef`,
              description: `open a warning alert with designed styles.`,
              parameters: [
                {
                  name: `message: string`,
                  description: `Warning message.`
                },
                {
                  name: `options?: AlertOption`,
                  description: `Options that controll alert instance's behavior. like title, dismissable...`
                }
              ],
              return: {
                name: `AlertRef`,
                description: `Reference to the newly-opened alert.`
              }
            },
            {
              name: `error: AlertRef`,
              description: `open an error alert with designed styles.`,
              parameters: [
                {
                  name: `message: string`,
                  description: `Error message.`
                },
                {
                  name: `options?: AlertOption`,
                  description: `Options that controll alert instance's behavior. like title, dismissable...`
                }
              ],
              return: {
                name: `AlertRef`,
                description: `Reference to the newly-opened alert.`
              }
            }
          ]
        }
      ]
    },
    {
      name: `Classes`,
      description: ``,
      columns: [
        {
          name: `AlertGlobalOptions`,
          description: `You can configuare all alert's behavior by provide <code>ALERT_DEFAULT_OPTIONS</code> to the AppModule.`,
          properties: [
            {
              name: `ttl: number`,
              description: `time to live.`
            },
            {
              name: `maxInstance: number`,
              description: `The maximum of alert instance.`
            },
            {
              name: `dismissable: boolean`,
              description: `Alert can be close manual or not.`
            }
          ]
        },
        {
          name: `AlertRef`,
          description: `Reference to an alert opened via the AlertService.`,
          // properties: [],
          methods: [
            {
              name: `close`,
              description: `close the opened alert instance.`,
              parameters: [
                {
                  name: `closeMsg?: string`,
                  description: `this given message will be emitted through the afterClosed stream.`
                }
              ],
            },
            {
              name: `afterClosed`,
              description: `Gets an observable that is notified when the alert is finished closing.`,
              return: {
                name: `Observable<string>`,
                description: `Stream that emits when the alert have finished closing.`
              }
            }
          ]
        }
      ]
    }
  ]

}
