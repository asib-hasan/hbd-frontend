export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiBaseUrl = config.public.apiBaseUrl || 'http://127.0.0.1:8000/api'
  
  const urls: any[] = []

  try {
    // 1. Fetch dynamic doctors
    const doctorsRes = await $fetch<any>(`${apiBaseUrl}/doctors`, {
      params: { per_page: 1000 } // Fetch enough to cover the sitemap
    })
    
    const doctors = Array.isArray(doctorsRes?.data) ? doctorsRes.data : (doctorsRes?.data?.data || [])
    
    for (const doc of doctors) {
      if (doc.slug) {
        urls.push({
          loc: `/doctor/${doc.slug}`,
          lastmod: doc.updated_at || new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8
        })
      }
    }
  } catch (err) {
    console.error('Sitemap: Error fetching doctors', err)
  }

  try {
    // 2. Fetch dynamic blogs
    const blogsRes = await $fetch<any>(`${apiBaseUrl}/blogs`, {
      params: { per_page: 1000 }
    })
    
    const blogs = Array.isArray(blogsRes?.data) ? blogsRes.data : (blogsRes?.data?.data || [])
    
    for (const blog of blogs) {
      if (blog.slug) {
        urls.push({
          loc: `/blog/${blog.slug}`,
          lastmod: blog.updated_at || new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.7
        })
      }
    }
  } catch (err) {
    console.error('Sitemap: Error fetching blogs', err)
  }

  return urls
})
