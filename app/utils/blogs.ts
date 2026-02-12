export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    authorAvatar: string;
    category: string;
    coverImage: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Understanding Homeopathy: A Beginner's Guide",
        slug: "understanding-homeopathy-beginners-guide",
        excerpt: "Discover the fundamental principles of homeopathy and how this holistic healing system works to restore balance in your body.",
        content: `
      <p>Homeopathy is a natural form of medicine used by over 200 million people worldwide. It works on the principle of 'like cures like' – that is, a substance that can cause symptoms in a healthy person can be used to treat similar symptoms in a sick person.</p>
      
      <h2>The Core Principles</h2>
      <p>The practice of homeopathy is based on several key principles that distinguish it from conventional medicine:</p>
      <ul>
        <li><strong>Law of Similars:</strong> The idea that a substance causing symptoms in healthy individuals can cure similar symptoms in sick people.</li>
        <li><strong>Minimum Dose:</strong> Using the smallest possible dose to stimulate healing.</li>
        <li><strong>Individualized Treatment:</strong> Each patient receives treatment tailored to their unique symptoms.</li>
      </ul>
      
      <h2>How Remedies Are Prepared</h2>
      <p>Homeopathic remedies are prepared through a process of serial dilution and succussion (vigorous shaking). This process is believed to transfer the healing properties of the original substance to the water-alcohol solution.</p>
      
      <h2>What to Expect in a Consultation</h2>
      <p>A homeopathic consultation is typically longer than a conventional medical appointment. The practitioner will ask detailed questions about your physical symptoms, emotional state, lifestyle, and medical history to find the most suitable remedy.</p>
    `,
        author: "Dr. Sarah Rahman",
        authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
        category: "Education",
        coverImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=400&fit=crop",
        publishedAt: "2024-01-15",
        readTime: "5 min read",
        tags: ["homeopathy", "natural healing", "holistic medicine"]
    },
    {
        id: "2",
        title: "Top 10 Homeopathic Remedies for Common Cold",
        slug: "homeopathic-remedies-common-cold",
        excerpt: "Learn about the most effective homeopathic treatments for cold symptoms and how to choose the right remedy for your specific symptoms.",
        content: `
      <p>The common cold affects millions of people every year. While there's no cure, homeopathic remedies can help alleviate symptoms and support your body's natural healing process.</p>
      
      <h2>1. Aconitum Napellus</h2>
      <p>Best used at the very first sign of a cold, especially after exposure to cold, dry wind. Symptoms include sudden onset, anxiety, and restlessness.</p>
      
      <h2>2. Allium Cepa</h2>
      <p>Perfect for colds with profuse, watery nasal discharge that burns the upper lip. Eyes may also water but tears are bland.</p>
      
      <h2>3. Arsenicum Album</h2>
      <p>Useful when there's burning nasal discharge, frequent sneezing, and the person feels chilly and anxious.</p>
      
      <h2>4. Belladonna</h2>
      <p>Best for sudden onset with high fever, flushed face, and throbbing headache. The person may feel hot but have cold extremities.</p>
      
      <h2>5. Bryonia</h2>
      <p>Helpful when symptoms develop slowly, with painful cough, dryness of mucous membranes, and irritability.</p>
    `,
        author: "Dr. Kamal Hossain",
        authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
        category: "Remedies",
        coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop",
        publishedAt: "2024-01-10",
        readTime: "7 min read",
        tags: ["cold remedies", "natural treatment", "winter health"]
    },
    {
        id: "3",
        title: "Homeopathy for Stress and Anxiety Relief",
        slug: "homeopathy-stress-anxiety-relief",
        excerpt: "Explore how homeopathic treatments can help manage stress and anxiety naturally without the side effects of conventional medications.",
        content: `
      <p>In today's fast-paced world, stress and anxiety have become increasingly common. Homeopathy offers a gentle, natural approach to managing these conditions.</p>
      
      <h2>Understanding Anxiety in Homeopathy</h2>
      <p>Homeopaths view anxiety as a disruption in the vital force – the body's natural healing energy. Treatment focuses on restoring balance by addressing the whole person, not just the symptoms.</p>
      
      <h2>Key Remedies for Anxiety</h2>
      <p>Several homeopathic remedies are commonly used for anxiety:</p>
      <ul>
        <li><strong>Argentum Nitricum:</strong> For anticipatory anxiety, especially before events.</li>
        <li><strong>Gelsemium:</strong> When anxiety causes trembling and weakness.</li>
        <li><strong>Aconitum:</strong> For sudden panic attacks with fear of death.</li>
        <li><strong>Ignatia:</strong> For grief-related anxiety and emotional sensitivity.</li>
      </ul>
      
      <h2>Lifestyle Support</h2>
      <p>Alongside homeopathic treatment, lifestyle changes such as regular exercise, adequate sleep, and mindfulness practices can enhance the healing process.</p>
    `,
        author: "Dr. Fatima Ahmed",
        authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
        category: "Mental Health",
        coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
        publishedAt: "2024-01-05",
        readTime: "6 min read",
        tags: ["anxiety", "stress relief", "mental health", "natural remedies"]
    },
    {
        id: "4",
        title: "Pediatric Homeopathy: Safe Treatment for Children",
        slug: "pediatric-homeopathy-safe-treatment-children",
        excerpt: "Discover why homeopathy is a popular choice for treating common childhood ailments safely and effectively.",
        content: `
      <p>Parents increasingly turn to homeopathy for their children's health needs. The gentle nature of homeopathic remedies makes them particularly suitable for young patients.</p>
      
      <h2>Why Choose Homeopathy for Children?</h2>
      <p>Homeopathic remedies are safe, non-toxic, and free from side effects when used correctly. They work with the child's natural healing abilities rather than suppressing symptoms.</p>
      
      <h2>Common Childhood Conditions Treated</h2>
      <ul>
        <li>Teething troubles</li>
        <li>Ear infections</li>
        <li>Colic and digestive issues</li>
        <li>Skin conditions like eczema</li>
        <li>Behavioral issues and ADHD</li>
        <li>Respiratory infections</li>
      </ul>
      
      <h2>Working with a Pediatric Homeopath</h2>
      <p>A qualified pediatric homeopath will take a comprehensive case history, considering the child's physical symptoms, emotional state, and constitutional type to select the most appropriate remedy.</p>
    `,
        author: "Dr. Nusrat Jahan",
        authorAvatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=100&h=100&fit=crop&crop=face",
        category: "Pediatrics",
        coverImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop",
        publishedAt: "2023-12-28",
        readTime: "5 min read",
        tags: ["children", "pediatric care", "safe treatment", "natural healing"]
    },
    {
        id: "5",
        title: "Homeopathy and Women's Health: A Comprehensive Guide",
        slug: "homeopathy-womens-health-guide",
        excerpt: "From menstrual issues to menopause, learn how homeopathy addresses women's health concerns at every life stage.",
        content: `
      <p>Women's health encompasses a wide range of conditions that can benefit from homeopathic treatment. The individualized approach of homeopathy makes it particularly effective for hormonal and reproductive issues.</p>
      
      <h2>Menstrual Health</h2>
      <p>Homeopathy can address various menstrual problems including painful periods, irregular cycles, heavy bleeding, and PMS symptoms.</p>
      
      <h2>Pregnancy Support</h2>
      <p>Many pregnant women choose homeopathy for conditions like morning sickness, fatigue, and emotional changes, as the remedies are gentle and safe for both mother and baby.</p>
      
      <h2>Menopause Management</h2>
      <p>Homeopathic remedies can help manage menopausal symptoms such as hot flashes, mood swings, sleep disturbances, and anxiety without the risks associated with hormone replacement therapy.</p>
      
      <h2>Fertility Support</h2>
      <p>Constitutional homeopathic treatment can support overall reproductive health and may be used alongside conventional fertility treatments.</p>
    `,
        author: "Dr. Rashida Begum",
        authorAvatar: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=100&h=100&fit=crop&crop=face",
        category: "Women's Health",
        coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        publishedAt: "2023-12-20",
        readTime: "8 min read",
        tags: ["women's health", "hormonal balance", "pregnancy", "menopause"]
    },
    {
        id: "6",
        title: "Building Immunity Naturally with Homeopathy",
        slug: "building-immunity-naturally-homeopathy",
        excerpt: "Strengthen your immune system with homeopathic approaches that support your body's natural defense mechanisms.",
        content: `
      <p>A strong immune system is your best defense against illness. Homeopathy offers a unique approach to immune support that focuses on strengthening the body's vital force.</p>
      
      <h2>Constitutional Treatment</h2>
      <p>The foundation of immune support in homeopathy is constitutional treatment – a personalized remedy chosen based on your complete physical, mental, and emotional picture.</p>
      
      <h2>Key Immune-Boosting Remedies</h2>
      <ul>
        <li><strong>Echinacea:</strong> Supports overall immune function</li>
        <li><strong>Oscillococcinum:</strong> Popular for flu prevention</li>
        <li><strong>Thuja:</strong> Used after vaccinations to support immunity</li>
        <li><strong>Sulphur:</strong> A deep-acting constitutional remedy</li>
      </ul>
      
      <h2>Lifestyle Factors</h2>
      <p>Homeopathic treatment works best alongside healthy lifestyle choices: adequate sleep, balanced nutrition, regular exercise, and stress management all contribute to strong immunity.</p>
    `,
        author: "Dr. Aminul Islam",
        authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face",
        category: "Immunity",
        coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
        publishedAt: "2023-12-15",
        readTime: "6 min read",
        tags: ["immunity", "prevention", "natural health", "wellness"]
    }
];

export const blogCategories = [
    "All",
    "Education",
    "Remedies",
    "Mental Health",
    "Pediatrics",
    "Women's Health",
    "Immunity"
];
