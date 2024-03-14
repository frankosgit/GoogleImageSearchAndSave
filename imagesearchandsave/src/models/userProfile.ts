export class UserProfile {
    constructor(
        public auth0Id: string,
        public likedImage: [{
            imageId: string,
            imageURL: string
        }]
    ) {}
}