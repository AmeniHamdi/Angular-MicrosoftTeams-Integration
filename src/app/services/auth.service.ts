import { Injectable, Inject } from '@angular/core';
import {
  Configuration,
  InteractionRequiredAuthError,
} from '@azure/msal-browser';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  RedirectRequest,
  PopupRequest,
} from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalInstance: IPublicClientApplication;

  private isIE =
    window.navigator.userAgent.indexOf('MSIE ') > -1 ||
    window.navigator.userAgent.indexOf('Trident/') > -1;

  private config: Configuration = {
    auth: {
      clientId: environment.clientId, // Application (client) ID from the app registration
      authority: `https://login.microsoftonline.com/${environment.tenantId}/`, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
      redirectUri: 'http://localhost:4200', // This is your redirect URI
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: this.isIE, // Set to true for Internet Explorer 11
    },
  };

  constructor() {
    this.msalInstance = new PublicClientApplication(this.config);
  }

  loginRedirect(request?: RedirectRequest): void {
    this.msalInstance.loginRedirect(request);
  }

  loginPopup(request?: PopupRequest): void {
    this.msalInstance.loginPopup(request);
  }

  logoutRedirect(): void {
    this.msalInstance.logoutRedirect();
  }

  logoutPopup(logoutRequest?: RedirectRequest): void {
    this.msalInstance.logoutPopup(logoutRequest || {});
  }

  async getAccessToken(): Promise<string> {
    const accounts = this.msalInstance.getAllAccounts();

    if (accounts.length === 0) {
      throw new Error('No account available');
    }

    const silentRequest = {
      account: accounts[0],
      scopes: [
        'User.Read',
        'Chat.ReadWrite',
        'ChatMessage.Send',
        'ChatMessage.Read',
        'Group.ReadWrite.All',
        'ChannelMessage.Read.All',
      ],
    };

    try {
      const response = await this.msalInstance.acquireTokenSilent(
        silentRequest
      );
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const interactiveRequest = {
          account: accounts[0],
          scopes: [
            'User.Read',
            'Chat.Read',
            'Chat.ReadWrite',
            'ChatMessage.Send',
            'ChatMessage.Read',
            'Group.ReadWrite.All',
            'ChannelMessage.Read.All',
          ],
          prompt: 'select_account',
        };

        const response = await this.msalInstance.acquireTokenPopup(
          interactiveRequest
        );
        return response.accessToken;
      } else {
        throw error;
      }
    }
  }
}
