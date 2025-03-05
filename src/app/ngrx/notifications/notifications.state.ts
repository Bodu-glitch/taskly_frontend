import { NotificationsModel } from '../../models/notifications.model';

export interface NotificationsState {
  notifications: NotificationsModel[];
  isCanGetMoreNotifications: boolean;
  isGettingNotifications: boolean;
  isGettingNotificationsSuccess: boolean;
  isGettingNotificationsFailure: any;

  isNewNotifications: boolean;
  isCheckingNewNotifications: boolean;
  isCheckingNewNotificationsSuccess: boolean;
  isCheckingNewNotificationsFailure: any;

  isInvitingUser: boolean;
  isInvitingUserSuccess: boolean;
  isInvitingUserFailure: any;
}
