//export const API_URL = "http://127.0.0.1:8000/api";
export const BASE_URL = "https://api.gowild.appscorridor.com";
//export const BASE_URL = "http://localhost:3000";
export const API_URL = `${BASE_URL}/api/v1`;
export const GOOGLE_KEY='AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0'
export const SOCKET_URL = "https://chat.gowild.appscorridor.com";
//export const SOCKET_URL = "http://localhost:5000";
export const KEY =
    "YW1Gb1lXNTZZV2xpTG1GemJHRnRMbTFsYUdGeVFHZHRZV2xzTG1OdmJUb3lZV2RoYVc0PQ==";


export const ENDPOINT = {
    login: `${API_URL}/auth/login`,
    forgetpassword: `${API_URL}/auth/forgot/password`,
    user_me: `${API_URL}/auth/me`,
    dashboard: `${API_URL}/dashboard/users-info`,

    dashboards :{
        bar_listing : `${API_URL}/dashboard/users`,
        csv_file : `${API_URL}/dashboard/csv`,
    },

    admin_user: {
        listing: `${API_URL}/admin/users`,
        approves: `${API_URL}/admin/users/`,
        rejects: `${API_URL}/admin/users/`,
        delete: {
            url:`${API_URL}/admin/`,
            id:null,
        },
        add_user: `${API_URL}/admin`,
        edit_user: {
            url : `${API_URL}/admin/`,
            id  : null
        },
        reject: {
            url : `${API_URL}/admin/`,
            id  : null,
            type: `/reject`

        },
        approve: {
            url : `${API_URL}/admin/`,
            id  : null,
            type: `/approve`
        }
    },



    sub_admin :{
        listing : `${API_URL}/sub-admin`,
        active : `${API_URL}/sub-admin/active-inActive/true`,
        inactive: `${API_URL}/sub-admin/active-inActive/false`,
        delete: {
            url:`${API_URL}/sub-admin/`,
            id:null
        },
        add_user: `${API_URL}/sub-admin`,
        active_inactive: `${API_URL}/sub-admin/`,
        edit_user: {
            url : `${API_URL}/sub-admin/`,
            id  : null
        },

    },


    admin_route: {
        listing: `${API_URL}/admin/route`,
        update_pictures: `${API_URL}/admin/route/:id/update-picture`,
        approve: `${API_URL}/admin/route/`,
        reject: `${API_URL}/admin/route/`,
    },

    route: {
        listing: `${API_URL}/admin/route`,
        delete: {
            url: `${API_URL}/route/`,
            id: null
        },
     edit_user: {
            url : `${API_URL}/admin/route/`,
            id  : null
        },
    },

    admin_guidelines :{
        listing : `${API_URL}/admin-guidelines`,
        terms_conditions : `${API_URL}/admin-guidelines`,
        eWaiver_listing : `${API_URL}/admin-guidelines/eWaiver`,
        faq_listing : `${API_URL}/admin-guidelines/faq`,
        termsAndConditions_listing : `${API_URL}/admin-guidelines/termsAndConditions`,
        huntEWaiver_listing : `${API_URL}/admin-guidelines/huntEWaiver `,
    },

    users_route :{
        listing : `${API_URL}/admin/route/users`,
        delete: {
            url:`${API_URL}/admin/route/users/`,
            id:null
        },
    },
    treasure_chests :{
        listing : `${API_URL}/admin/treasure-chest`,
        update_picture : `${API_URL}/admin/treasure-chest/`,
        listing_hunt : `${API_URL}/admin/treasure-chest/user-hunts`,
        approve_reject : `${API_URL}/admin/treasure-chest/hunt/status/`,
        csv_file : `${API_URL}/admin/treasure-chest/csv`,
        push_notification : `${API_URL}/notifications/push`,
        delete: {
            url:`${API_URL}/admin/treasure-chest/`,
            id:null
        },
        edit_user: {
            url : `${API_URL}/admin/treasure-chest/`,
            id  : null
        },

    },
    historical_event :{
        add_event : `${API_URL}/admin/route-historical-events/`,
        delete: {
            url:`${API_URL}/admin/route-historical-events`,
            id:null
        },
    },
    admin_sponsor :{
        sponsor : `${API_URL}/admin/sponsor`,
        sponsor_img : `${API_URL}/admin/sponsor/`,
    },
    support :{
        tickets : `${API_URL}/ticket`,
        ticket_messages : `${API_URL}/ticket-messages/:id?limit=100`,
        mark_as_complete: `${API_URL}/ticket/:id/status`,
        socket_url: SOCKET_URL,
        emit_message:'msgToAdmin',
        listen_message:'msgSupport'
    },

};