export default [
  {
    path: '/',
    component: '../layouts/basic/BasicLayout',
    routes: [
      {
        path: '/auth',
        component: '../layouts/auth/AuthLayout',
        routes: [
          {
            name: 'login',
            path: '/auth/login',
            component: './auth/login/LoginPage',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/admin/AdminLayout',
        routes: [
          {
            path: '/',
            redirect: '/dashboard',
            auth: ['admin', 'always'],
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard2',
            component: './dashboard/DashboardPage',
            auth: ['admin', 'always'],
          },
          {
            path: '/user/search',
            name: 'user_search',
            icon: 'user-search',
            key: 'user-search',
            component: './userSearch/userSearch/UserSearchPage',
            auth: ['admin'],
          },
          {
            path: '/user/results',
            name: 'user_search',
            key: 'user-search',
            icon: '',
            component: './userSearch/searchResults/SearchResultsPage',
            auth: ['admin'],
            hideInMenu: true,
          },
          {
            path: '/user/detail/:userId',
            name: 'user_search',
            key: 'user-search',
            icon: '',
            component: './userSearch/user/UserPage',
            auth: ['admin'],
            hideInMenu: true,
          },
          {
            path: '/order/search',
            name: 'order_search',
            icon: 'user-search',
            key: 'order-search',
            component: './orderSearch/orderSearch/OrderSearchPage',
            auth: ['admin'],
          },
          {
            path: '/order/results',
            name: 'order_search',
            key: 'order-search',
            icon: '',
            component: './orderSearch/searchResults/OrderSearchResultsPage',
            auth: ['admin'],
            hideInMenu: true,
          },
          {
            path: '/administrators',
            name: 'administrators',
            icon: 'administrators',
            auth: ['admin'],
            component: './administrators/AdministratorsPage',
          },
          {
            path: '/products',
            name: 'products',
            icon: 'products',
            auth: ['admin'],
            routes: [
              {
                path: '/products/list',
                name: 'products',
                key: 'products',
                component: './products/list/ProductsPage',
                auth: ['admin'],
              },
              {
                path: '/products/add',
                name: 'add_product',
                component: './products/add/AddProductPage',
                auth: ['admin'],
              },
              {
                path: '/products/edit/:id',
                name: 'products',
                key: 'products',
                icon: '',
                component: './products/edit/EditProductPage',
                auth: ['admin'],
                hideInMenu: true,
              },
              {
                path: '/products/availability',
                name: 'availability_product',
                component: './products/availability/AvailabilityProductPage',
                auth: ['admin'],
              },
            ],
          },
          {
            path: '/dist-centers/list',
            name: 'distribution_centers',
            key: 'dist-center',
            icon: 'dist-centers',
            component: './distCenters/DistCentersPage',
            auth: ['admin'],
          },
          {
            path: '/dist-centers/edit',
            name: 'distribution_centers',
            key: 'dist-center',
            icon: '',
            component: './distCenters/edit/EditDistCenterSubPage',
            auth: ['admin'],
            hideInMenu: true,
          },
          {
            path: '/inventory',
            name: 'inventory',
            icon: 'inventory',
            component: './inventory/InventoryPage',
            auth: ['admin'],
          },
          {
            path: '/email-campaigns',
            name: 'email_campaigns',
            icon: 'email-campaigns',
            auth: ['admin'],
            routes: [
              {
                path: '/email-campaigns/system-email/list',
                name: 'system_emails',
                component: './emailCampaigns/systemEmails/SystemEmailsPage',
                auth: ['admin'],
              },
              {
                path: '/email-campaigns/system-email/edit/:id',
                name: 'edit_system_email',
                component: './emailCampaigns/editSystemEmails/EditSystemEmailPage',
                auth: ['admin'],
                hideInMenu: true,
              },
              {
                path: '/email-campaigns/broadcast-email/list',
                name: 'broadcast_emails',
                component: './emailCampaigns/broadcastEmails/BroadcastEmailsPage',
                auth: ['admin'],
              },
              {
                path: '/email-campaigns/broadcast-email/create',
                name: 'create_broadcast_email',
                component: './emailCampaigns/createBroadcast/CreateBroadcastPage',
                auth: ['admin'],
              },
              {
                path: '/email-campaigns/broadcast-email/edit/:id',
                name: 'edit_broadcast_email',
                component: './emailCampaigns/editBroadcast/EditBroadcastPage',
                auth: ['admin'],
                hideInMenu: true,
              },
              {
                path: '/email-campaigns/broadcast-email/chunks/edit/:id',
                name: 'broadcast_chunks',
                component: './emailCampaigns/broadcastChunks/BroadcastChunksPage',
                auth: ['admin'],
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/merchants',
            name: 'merchants',
            icon: 'merchants',
            component: './merchants/MerchantsPage',
            auth: ['admin'],
          },
          {
            path: '/reports',
            name: 'reports',
            icon: 'reports',
            auth: ['admin'],
            routes: [
              {
                path: '/reports/payout',
                name: 'payout_report',
                component: './reports/payoutReport/PayoutReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/country',
                name: 'country_revenue',
                component: './reports/countryReport/CountryReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/us-states',
                name: 'us_states_revenue',
                component: './reports/usStatesRevenue/UsStatesRevenuePage',
                auth: ['admin'],
              },
              {
                path: '/reports/rank',
                name: 'rank_report',
                component: './reports/rankReport/RankReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/sales',
                name: 'sales_report',
                component: './reports/salesReport/SalesReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/credit-wallet',
                name: 'credit_wallet_report',
                component: './reports/creditWalletReport/CreditWalletReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/order-source',
                name: 'order_source_report',
                component: './reports/orderSourceReport/OrderSourceReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/top-earners',
                name: 'top_earners',
                component: './reports/topEarnersReport/TopEarnersReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/rank-trackers',
                name: 'rank_trackers',
                component: './reports/rankTrackersReport/RankTrackersReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/autoship',
                name: 'autoship_report',
                component: './reports/autoshipReport/AutoshipReportPage',
                auth: ['admin'],
              },
              {
                path: '/reports/clawback_users',
                name: 'clawback_users',
                component: './reports/clawbackReport/ClawbackReportPage',
                auth: ['admin'],
              },
            ],
          },
          {
            path: '/pay-commissions',
            name: 'pay_commissions',
            component: './payCommissions/PayCommissionsPage',
            icon: 'pay-commissions',
            auth: ['admin'],
          },
          {
            path: '/withdrawal-requests',
            name: 'withdrawal_requests',
            component: './withdrawalRequests/WithdrawalRequestsPage',
            icon: 'pay-commissions',
            auth: ['admin'],
          },
          {
            path: '/fraud-management',
            name: 'fraud_management',
            icon: 'fraud-management',
            auth: ['admin'],
            routes: [
              {
                path: '/fraud-management/flagged-orders',
                name: 'flagged_orders',
                component: './fraudManagement/flaggedOrders/FlaggedOrdersPage',
                auth: ['admin'],
              },
              {
                path: '/fraud-management/flagged-users',
                name: 'flagged_users',
                component: './fraudManagement/flaggedUsers/FlaggedUsersPage',
                auth: ['admin'],
              },
              {
                path: '/fraud-management/fraud-report',
                name: 'fraud_report',
                component: './fraudManagement/fraudReport/FraudReportPage',
                auth: ['admin'],
              },
              {
                path: '/fraud-management/fraud',
                name: 'fraud_settings',
                icon: '',
                component: './fraudManagement/fraudSettings/FraudSettingsPage',
                auth: ['admin'],
              },
              {
                path: '/fraud-management/chargeback',
                name: 'chargeback',
                component: './fraudManagement/chargeback/ChargebackPage',
                auth: ['admin'],
              },
            ],
          },
          {
            path: '/tools',
            name: 'tools',
            icon: 'tools',
            auth: ['admin'],
            routes: [
              {
                path: '/tools/events',
                name: 'events',
                component: './tools/events/EventsPage',
                auth: ['admin'],
              },
              {
                path: '/tools/news',
                name: 'news',
                component: './tools/news/NewsPage',
                auth: ['admin'],
              },
              {
                path: '/tools/videos',
                name: 'videos',
                component: './tools/videos/VideosPage',
                auth: ['admin'],
              },
              {
                path: '/tools/resources',
                name: 'resources',
                component: './tools/resources/ResourcesPage',
                auth: ['admin'],
              },
              {
                path: '/tools/promotions',
                name: 'promotions',
                component: './tools/promotions/PromotionsPage',
                auth: ['admin'],
              },
            ],
          },
          {
            path: '/website',
            name: 'website',
            icon: 'website',
            auth: ['admin'],
            routes: [
              {
                path: '/website/corporate',
                name: 'corporate_website',
                component: './website/corporateWebsite/CorporateWebsitePage',
                auth: ['admin'],
              },
              {
                path: '/website/capture-pages',
                name: 'capture_pages',
                component: './website/capturePages/CapturePagesPage',
                auth: ['admin'],
              },
            ],
          },
          {
            path: '/settings',
            name: 'settings',
            icon: 'settings',
            auth: ['admin'],
            routes: [
              {
                path: '/settings/currency',
                name: 'currency_settings',
                icon: '',
                component: './settings/currencySettings/CurrencySettingsPage',
                auth: ['admin'],
              },
              {
                path: '/settings/payment',
                name: 'payment_settings',
                icon: '',
                component: './settings/paymentSettings/PaymentSettingsPage',
                auth: ['admin'],
              },
              {
                path: '/settings/payout',
                name: 'payout_providers',
                icon: '',
                component: './settings/payoutProviders/PayoutProvidersPage',
                auth: ['admin'],
              },
              {
                path: '/settings/tax',
                name: 'tax_settings',
                icon: '',
                component: './settings/taxSettings/TaxSettingsPage',
                auth: ['admin'],
              },
              {
                path: '/settings/backoffice',
                name: 'user_backoffice',
                icon: '',
                component: './settings/backofficeSettings/BackofficeSettingsPage',
                auth: ['admin'],
              },
            ],
          },
          {
            path: '/compensation-plan',
            name: 'compensation_plan',
            icon: 'compensation-plan',
            component: './compensationPlan/CompensationPlanPage',
            auth: ['admin'],
          },
          {
            component: './errors/404',
          },
        ],
      },
      {
        component: './errors/404',
      },
    ],
  },
  {
    component: './errors/404',
  },
];
