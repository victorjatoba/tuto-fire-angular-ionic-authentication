import { NotificationReturnType } from './notification-return-type.enum';

/**
 * All notification return needs to contains this information.
 */
export interface NotificationReturn {
    type: NotificationReturnType;
    value: any;
}
