import { when, action, computed, observable, runInAction } from "mobx";
import authStore from './authStore';

class UserStore {
    @observable presentations = []
    @observable preferences = {};
    
    constructor() {
        when(
            () => authStore.user,
            () => this.fetchUser(authStore.user)
        );
    }
   
    @action
    fetchUser = (authUser) => {
        userAgent.getCurrentUser()
            .then(user => {
                runInAction(() => {
                    this.presentations = user.presentations;
                    this.preferences = user.preferences;
                });
            });
    }

}