export type TokensType = {accessToken: string, refreshToken: string}

export type DataHeadersType = {
  "Authorization": string,
  "Content-Type": "application/json"
}

export type GuildType = {
    id: string,
    name: string,
    icon: string,
    owner: boolean,
    permissions: number,
    permissions_new: string,
    features: string[]
}