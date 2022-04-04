import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: Number;
  nick: String;
  email: String;
  status: Boolean;
  attemps: Number;
  web: Boolean;
  email_verified_at: Boolean;
  code_security: Number;
  created_at: Date;
  updated_at: Date;
  admin: {
    id: Number,
    user_id: Number,
    document_type: String,
    document_number: String,
    name: String,
    lastname: String,
    birthday: Date,
    gender: String,
    country_id: Number,
    state_id: Number,
    city_id: Number,
    parish_id: Number,
    address: String,
    phone: String,
    photo: String,
    photo_url: String,
    language: String,
    timezone: String
  };
  roles: [{
    id: Number,
    name: String,
    key?: String,
    guard_name?: String,
    created_at?: Date,
    updated_at?: Date
  }];






  username: String;
  password: String;
  fullname: String;
  pic: string;
  occupation: string;
  companyName: string;
  phone: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;
  // personal information
  firstname: string;
  lastname: string;
  website: string;
  // account information
  language: string;
  timeZone: string;
  communication: {
    email: boolean,
    sms: boolean,
    phone: boolean
  };
  // email settings
  emailSettings: {
    emailNotification: boolean,
    sendCopyToPersonalEmail: boolean,
    activityRelatesEmail: {
      youHaveNewNotifications: boolean,
      youAreSentADirectMessage: boolean,
      someoneAddsYouAsAsAConnection: boolean,
      uponNewOrder: boolean,
      newMembershipApproval: boolean,
      memberRegistration: boolean
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
      tipsOnGettingMoreOutOfKeen: boolean,
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
      tipsOnMetronicBusinessProducts: boolean
    }
  };

  setUser(user: any) {
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.fullname = user.fullname || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/users/default.jpg';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
    this.socialNetworks = user.socialNetworks;
  }
}
