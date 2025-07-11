import { TypeUserRoles, User } from "@/modules/user/domain"
import { UserAuthenticateResponse } from "@/modules/user/protocols/authenticateUserDTO"
import { ResponseAdapter } from "@/shared/helpers"

type UserAttributes = {
    name: string,
    email: string,
    role: TypeUserRoles,
    account_activate_at: Date | null,
    createdAt: Date,
    updatedAt: Date,
}

export interface UserResponseAdapter<T> extends ResponseAdapter<T>{
    token?: {
        access_token: string,
        refresh_token: string
    }
}

export const userResponse = (user: User): UserResponseAdapter<UserAttributes> => {
    return {
        id: user.id,
        attributes: {
            name: user.props.name,
            email: user.props.email,
            role: user.props.role,
            createdAt: user.props.createdAt,
            updatedAt: user.props.updatedAt,
            account_activate_at: user.props.account_activate_at,
        },
        links: {
            self: "/api/user/"+user.id
        }
    }
}

export const userTokenResponse = (user: UserAuthenticateResponse): UserResponseAdapter<UserAttributes> => {
    return {
        id: user.id,
        attributes: {
            name: user.props.name,
            email: user.props.email,
            role: user.props.role,
            createdAt: user.props.createdAt,
            updatedAt: user.props.updatedAt,
            account_activate_at: user.props.account_activate_at,
        },
        links: {
            self: "/api/user/"+user.id
        },
        token: {
            access_token: user.token.accessToken,
            refresh_token: user.token.refreshToken
        }
    }
}