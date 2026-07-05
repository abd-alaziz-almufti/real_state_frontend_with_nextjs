/**
 * API definitions for the Agencies feature.
 * Consumes the central axios instance or fallbacks to comprehensive mock data.
 */

import api from '@/lib/axios';

const MOCK_AGENCIES = [
  {
    id: 1,
    name: 'Skyline Realty',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlmga8nDZCDdsbNTRQWYBHiBqvAmAqf8CHQOFeWv7CQZnlD3KJt_-v3I97UAyavmGXh2_2UOQ_U1oiINkwCiXVjz-QwBNuzwpnAjce2mdQ_Uo8_cZAlVwi_y1x5jLBg8Txj8Zz-QtBPAmD0RVqZBy3eYq4avytkQevqC6VTzwpwIBdjpjgyRuCR3p8ypExy4mE9KxmAoIymqif4WHszJq2-iZk9Bx99sAzDexoyn8WFsgf7gHLKV5d6g',
    verified: true,
    relation: 'Subsidiary of Apex Group',
    badge: 'Elite Partner',
    badgeType: 'elite', // custom styling category
    hq: 'Downtown',
    branches: 'Arts District',
    agents_count: 15,
    agents_avatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2v50JgbHKJ2vxp1WAmuaQZsXIEC1OWqonlEQYvhdIbIHfiHhJpNXLTExNfAhA5uw9ZxnJwL4Ne2o987fSWfqUMSlWJgB2WFVxstMNvtOVINz4r6O-6MiJjUZY10O0GaugnH-NUg2lwria00lVebTQ37wvIYVsh4vAtbuSGV41nzPcZveOYR07uvYuI6k6Z9wwiE_XDp2SIrI7Ef_I_QOq8IO2O08kcoIBDux8DJtND9IV5ozfE4nBiQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBQugW1ROSrTsG72G9LdkZTFsS_phI5iCLK-e6LOlxqcNj5p-Rvz94IfxoUKlU6wofYNMMWac4F2G1PFSNIzF_qrwPoN5Cz0VKDou4C-pRmZkboEmp-te_6p9YFBMih_i0pt3Jr0xmtgszg1_Ks3HcruFm13CVWIOLN6uNUN-3Xkxe7OMauy_YH3N6GOcdPMLMy0M1NsVI4NR26H8YlB1Gox9qUPjJrN-JEpesxonm63x6p4QRSBqtIA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmZOVmVIVAaDex3Kv3x8qttjaveYphhMQue8vQawd3G0rBt2YL6nXAg7ZZXCOt2i-LR6w5wF9crhcPqxO7pJjUG_Dy_YV9hv78hJe-QEZj7dtdjy3FgrrgZ9Vs7GsY-lZi_ug-O_4lDNMMFFJvuXzBHb3wkHtDiFEjIWbT9acKIMuhnwJWCaRfJF9Y3vL6sV3HRxHvo1RTdkB6mCgPsI2NOZuzjw97jbTC4nRIEJefXv-oRrQ6KlBnuw'
    ],
    rating: 4.9,
    properties_count: 150,
    years_active: 12,
    partner_developers: 'Emaar, Damac',
    phone: '+971 4 123 4567',
    email: 'info@skylinerealty.ae',
    aboutTitle: 'Curating Exceptional Living Experiences',
    aboutDescription: 'Apex Properties was founded on the principle that property management should be as seamless as it is sophisticated. We specialize in luxury high-rise developments and exclusive urban estates, providing a boutique service tailored to the modern tenant and discerning owner.',
    aboutSubDescription: 'Our team combines deep market intelligence with a passion for architectural excellence. We don\'t just manage buildings; we foster communities and ensure every resident feels the Apex difference from the moment they walk through the lobby.',
    inventory: [
      {
        id: 101,
        title: 'Lumina Tower East',
        price: '$4,200/mo',
        address: '245 Skyline Avenue, Downtown District',
        beds: 2,
        baths: 2,
        sqft: '1,450',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6BTV4HNs23d0qQoChcl63WwOI0CNELQvio7Lzz6blNvCvTRqxvDo0LHps2UseoOoELu3SHtOGATXBhOtlW8U0Np5P6272Eu09_Mc1s-bPIobEdiwgw6sfhFZSFqFXbU-uYB5Emtz0bnZviQc3RmR7_IqHkEj8ZD6dgZtcgg8ohnSkK9d02aoPOFxWzsgVQl3QW4lbjfowvh8fM_f2k7F1w9zMemJ7hBJmOylqcHm34WXpYX-qMZX3jK_NwPFMWfOE8uHurW8IPQ',
        status: 'UNIT AVAILABLE'
      },
      {
        id: 102,
        title: 'The Meridian Loft',
        price: '$3,200/mo',
        address: '12 Heritage Way, Arts District',
        beds: 1,
        baths: 1,
        sqft: '980',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd1UH9bjqIrKWcEbYUhmYmF8XFMyk3h5aVoQW5hXS3PsUk503U0BfbNam3m1Qn-Xwbu5MncNZaOBPql6Z0G0HSFekoxrgu1R7QYC_bUdujKwnpPy3ZIOXcrS9LGpaSjR-wh6CO5NB0gvZR7PSzf-fm7zs76Z2YtNnpUEZo-PvUZtDatL9B-LSRODeT0PDpJR4rrgTT5XwgnNqZMWGOcDGyq_mvwTpgnkMH-KbeNHgcZDj7eGcIlScA9Z4_W-6pIhCLcpYuyOSxbw',
        status: 'UNIT AVAILABLE'
      },
      {
        id: 103,
        title: 'Azure Heights',
        price: '$5,850/mo',
        address: '88 Summit Crest, North Ridge',
        beds: 3,
        baths: 3,
        sqft: '2,100',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYze3F5yW5Yy93kew_0dy4K-Y1iZ0uXUEQZTKSjax5SAoS7QxIax33lN67cIRkhJbMSmTycXddRKYB9AYYVfYoc9Gs2ZjbJhiVq45G4LLpgQFVs5yyJS83hUcxJO9W0MPHzpmWIpRPiNbT3Z3n1k1f2CG2MQwXHKFNEf2R46StWHUc5XxVhl0ZdcBsSJbcZxoTzmJ__iagJuxTIAeN66b8yVn00fzY9RgXe3HMNwKPd1EsjfOQdQfCnyqop9dVVW4iIchOW-Kbtg',
        status: 'UNIT AVAILABLE'
      }
    ]
  },
  {
    id: 2,
    name: 'Urban Living',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJU1vVTE2oH8NTPfCfjwJohHEqI8K034zBvaPBpF6QAQvJz2AsPcA1QQQGTFFyBOLj2I3_xrk_eLvdJ6_85T8Z9QSZ3IdTkhcJ7E7uduR67Vk0OUDVdwmux7m_iZp87Ic3WtwsrN3Cja1283_8a6Rx18nz06XPUcDZZwOVCAQ6TgEEJs2n1XVMjln1C8LmL4U5r9fFTQLfRAdy1-XIFoDWXd43hHtXOAYEmeL7_r5Bugx9_ZiKeGG50A',
    verified: true,
    relation: 'Exclusive Partner of Nakheel',
    badge: 'Exclusive',
    badgeType: 'exclusive',
    hq: 'West End',
    branches: 'Coastal',
    agents_count: 8,
    agents_avatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4wAGzzPOHVmNBfMdsVV90BQOJ4KVJbDp8DAm0ncwHLd-79-vbOkuwjtovYid2Yi6nGeifzEbaCAroxx-rMZF1oTCsz2k5slymxACq-GJbZnTnW-3GP9CaWAL57t6J-XU5p-WFUG2GmKI8LjWOfIUHU_8OKijVjNCw1Pwe7ZGlsqhNaRXzM7Af5FnU7NtSoc0TyRtfedNNbaH1uZnms3T-_W_uWrIL1o3u0-KilBfcm2CYHU3VXpD4FQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFnv3AwzvEFQy1k0pob2Fi4jwB12JUfNTiyTk_J9EFbHHAiG4MUcZ75CPLoVU6RrvdnPNeBDb9cMHqRqqK9oFlsM14QumDT5qLFTaSMzUDCAFG29wPyrIqJ_-jwa9eozzJTsnAthlIaYQxTpz0faY9q8NaAqS3YE-Ht1SNcGv9IWqv97X3Lwb7e4KDE1XnU0Mrqq9oDHXQr5ZJedV41-VHiicMBt5N4BxZBbioCF8KxYlh2XM_UCRasQ'
    ],
    rating: 4.8,
    properties_count: 85,
    years_active: 8,
    partner_developers: 'Nakheel, Sobha',
    phone: '+971 4 987 6543',
    email: 'contact@urbanliving.ae',
    aboutTitle: 'Modern Urban Living Solutions',
    aboutDescription: 'Urban Living is dedicated to bringing you the best urban housing options in prime locations. We specialize in modern apartments and family townhouses with smart city integrations.',
    aboutSubDescription: 'Since 2018, we have connected thousands of young professionals and families to active urban spaces. Our philosophy focuses on efficiency, sustainability, and community-centric development.',
    inventory: [
      {
        id: 201,
        title: 'The Meridian Loft',
        price: '$3,200/mo',
        address: '12 Heritage Way, Arts District',
        beds: 1,
        baths: 1,
        sqft: '980',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd1UH9bjqIrKWcEbYUhmYmF8XFMyk3h5aVoQW5hXS3PsUk503U0BfbNam3m1Qn-Xwbu5MncNZaOBPql6Z0G0HSFekoxrgu1R7QYC_bUdujKwnpPy3ZIOXcrS9LGpaSjR-wh6CO5NB0gvZR7PSzf-fm7zs76Z2YtNnpUEZo-PvUZtDatL9B-LSRODeT0PDpJR4rrgTT5XwgnNqZMWGOcDGyq_mvwTpgnkMH-KbeNHgcZDj7eGcIlScA9Z4_W-6pIhCLcpYuyOSxbw',
        status: 'UNIT AVAILABLE'
      },
      {
        id: 202,
        title: 'Lumina Tower East',
        price: '$4,200/mo',
        address: '245 Skyline Avenue, Downtown District',
        beds: 2,
        baths: 2,
        sqft: '1,450',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6BTV4HNs23d0qQoChcl63WwOI0CNELQvio7Lzz6blNvCvTRqxvDo0LHps2UseoOoELu3SHtOGATXBhOtlW8U0Np5P6272Eu09_Mc1s-bPIobEdiwgw6sfhFZSFqFXbU-uYB5Emtz0bnZviQc3RmR7_IqHkEj8ZD6dgZtcgg8ohnSkK9d02aoPOFxWzsgVQl3QW4lbjfowvh8fM_f2k7F1w9zMemJ7hBJmOylqcHm34WXpYX-qMZX3jK_NwPFMWfOE8uHurW8IPQ',
        status: 'UNIT AVAILABLE'
      }
    ]
  },
  {
    id: 3,
    name: 'Prestige Estates',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBWIMR8nNN0xKDjXk54rTtfi_Jf8Ki9fJBveJtVm2U17lqDSsXNyFjfru49IGXLyYg7oKzWrw124OuMl4xqwHwPM7zAoWMZZ9-H7CV0mLgeplJzFKhZhnEOWlWTn9OvAwZC1HdrvR5NAMWIolq7ovk6c9vsu348lMJQVTKa8zkUwVj1iwMT-GyKI_zvs0JwpiVuPTUN8c2tm9eKjZI7B45ARZ2MQtIyLPMhiW_uT2oLqq3Y6lHGiV9hw',
    verified: true,
    relation: 'Independent Boutique Agency',
    badge: 'High Growth',
    badgeType: 'high_growth',
    hq: 'Palm North',
    branches: 'Marina',
    agents_count: 24,
    agents_avatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEEw968pvXwna8Jt-gA6ztjepDg96eqixJqwO9b0NP7HxB-nhQdefNLH3jQUVuYSC5Yk7roH46PmBcKvfuba5JzLVd4y9Ie5Nl69McOubdMKH2-WzfBSnKxozQhvheETtEzbyFURDJiy7hZSFUNOOyO8hpS5ZlNWDAKlR4lZAdFWadMgWouTJ3lr5tIjYMZFFQ9-yU4NkQfSassD_hFx_tOvWhkczNJmlH8AB8uR6MX3_DLw12CU7G0w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNIvlJYXDuDyZ7dDDXxVp-zHzHMwsbGKrlVegVedCEuubbvBEQatXYUCvOVv2XlEC3GMkL5o6RLg0iCe6k3T29Ql9DR8e1n1fOBYgOidE9z7NMFyNM41VnaaI8mG1L_sw7dcJzXp7HeUIXSku7lweNRzVIN5YPE9kqpERfFd-PbweyOpyl4t_kqJV5V016_Jm7itHpdEQ7m6K4XlbIl5iHyzJfnFJKjNZUK6cMcTtK426V7-02kvYDDA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Gd2-b6HXF-nspqifT3CwP4UeSdBUz3K9THcuvR596QN3AzJGMeKvuFmq2gfBOS81Cq1xTBczu8jrT6NZIAUa12AqpOgwyxsr1_YTx8N1CGQSp-vIlimau98PRDEDbo02_aKgFVasq8neHkVZ10hZcWEZ__BtHOn9gpDEnskpz8PIJ50jCx_KDdtQmyZEubIJsnPho13dyBPhprd0RjwTqK2Iq6GU5WsevfCJ-Os5Pxm-g88K2vMIuA'
    ],
    rating: 5.0,
    properties_count: 320,
    years_active: 15,
    partner_developers: 'Dubai Properties, Meydan',
    phone: '+971 4 456 7890',
    email: 'concierge@prestigeestates.ae',
    aboutTitle: 'Luxury Real Estate Uncompromised',
    aboutDescription: 'Prestige Estates has been a leading force in luxury real estate for over a decade. We pride ourselves on representing the most exclusive properties in the market, providing world-class discretion and advisory services.',
    aboutSubDescription: 'Representing properties of timeless architecture, our agents are equipped with top-tier analytical models and highly refined local expertise. We deliver concierge brokerage, tenant placement, and asset advisory.',
    inventory: [
      {
        id: 301,
        title: 'Azure Heights',
        price: '$5,850/mo',
        address: '88 Summit Crest, North Ridge',
        beds: 3,
        baths: 3,
        sqft: '2,100',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYze3F5yW5Yy93kew_0dy4K-Y1iZ0uXUEQZTKSjax5SAoS7QxIax33lN67cIRkhJbMSmTycXddRKYB9AYYVfYoc9Gs2ZjbJhiVq45G4LLpgQFVs5yyJS83hUcxJO9W0MPHzpmWIpRPiNbT3Z3n1k1f2CG2MQwXHKFNEf2R46StWHUc5XxVhl0ZdcBsSJbcZxoTzmJ__iagJuxTIAeN66b8yVn00fzY9RgXe3HMNwKPd1EsjfOQdQfCnyqop9dVVW4iIchOW-Kbtg',
        status: 'UNIT AVAILABLE'
      },
      {
        id: 302,
        title: 'Lumina Tower East',
        price: '$4,200/mo',
        address: '245 Skyline Avenue, Downtown District',
        beds: 2,
        baths: 2,
        sqft: '1,450',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6BTV4HNs23d0qQoChcl63WwOI0CNELQvio7Lzz6blNvCvTRqxvDo0LHps2UseoOoELu3SHtOGATXBhOtlW8U0Np5P6272Eu09_Mc1s-bPIobEdiwgw6sfhFZSFqFXbU-uYB5Emtz0bnZviQc3RmR7_IqHkEj8ZD6dgZtcgg8ohnSkK9d02aoPOFxWzsgVQl3QW4lbjfowvh8fM_f2k7F1w9zMemJ7hBJmOylqcHm34WXpYX-qMZX3jK_NwPFMWfOE8uHurW8IPQ',
        status: 'UNIT AVAILABLE'
      }
    ]
  }
];

export const AgenciesApi = {
  getAll: async (params = {}) => {
    try {
      // Attempt API call
      const response = await api.get('agencies', { params });
      return response.data || response;
    } catch (e) {
      console.warn('Agencies API not found or failing, using mock fallback data:', e);
      
      // Simulate filtering locally
      let filtered = [...MOCK_AGENCIES];
      
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          a => a.name.toLowerCase().includes(query) || 
               a.hq.toLowerCase().includes(query) ||
               a.branches.toLowerCase().includes(query) ||
               a.partner_developers.toLowerCase().includes(query)
        );
      }
      
      if (params.serviceArea && params.serviceArea !== 'Service Area') {
        const area = params.serviceArea.toLowerCase();
        filtered = filtered.filter(
          a => a.hq.toLowerCase().includes(area) || a.branches.toLowerCase().includes(area)
        );
      }
      
      if (params.size && params.size !== 'Agency Size') {
        const size = params.size.toLowerCase();
        filtered = filtered.filter(a => {
          if (size === 'boutique') return a.properties_count < 200;
          if (size === 'enterprise') return a.properties_count >= 200;
          return true;
        });
      }

      if (params.type) {
        const type = params.type.toLowerCase();
        filtered = filtered.filter(a => {
          if (type === 'exclusive') return a.badge.toLowerCase() === 'exclusive';
          if (type === 'independent') return a.relation.toLowerCase().includes('independent');
          if (type === 'elite developer alliance') return a.badge.toLowerCase().includes('elite') || a.partner_developers.includes('Emaar');
          return true;
        });
      }
      
      return {
        data: filtered,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: filtered.length
        }
      };
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`agencies/${id}`);
      return response.data || response;
    } catch (e) {
      console.warn(`Agency API getById(${id}) failing, using mock fallback:`, e);
      const agency = MOCK_AGENCIES.find(a => a.id === parseInt(id));
      if (!agency) {
        throw new Error(`Agency with ID ${id} not found.`);
      }
      return {
        data: agency
      };
    }
  }
};
