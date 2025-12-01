import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const activePersona = ref('sophie')
  const isTyping = ref(false)
  
  // AI Personas
  const personas = ref({
    sophie: {
      id: 'sophie',
      name: 'Sophie',
      role: 'Project Manager',
      description: 'Your AI project management partner. I help coordinate tasks, track progress, and keep everything on schedule.',
      color: '#f59e0b',
      icon: 'pi-users'
    },
    felix: {
      id: 'felix',
      name: 'Felix',
      role: 'Strategy Consultant',
      description: 'Your AI strategy advisor. I help with strategic analysis, competitive positioning, and long-term planning.',
      color: '#3b82f6',
      icon: 'pi-compass'
    }
  })

  // Mock conversation history per project
  const conversations = ref({
    'project-1': [
      {
        id: 'msg-1',
        persona: 'sophie',
        type: 'ai',
        content: "Good morning! I've reviewed the project status and have a few updates for you. The market research phase is now complete, and we're progressing well on the strategy development phase.",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        sources: []
      },
      {
        id: 'msg-2',
        persona: null,
        type: 'user',
        content: "Great! What are the key findings from the market research?",
        timestamp: new Date(Date.now() - 86400000 * 2 + 60000).toISOString()
      },
      {
        id: 'msg-3',
        persona: 'sophie',
        type: 'ai',
        content: "I'll bring in Felix for the strategic insights. He's been leading the market analysis work.",
        timestamp: new Date(Date.now() - 86400000 * 2 + 120000).toISOString(),
        sources: []
      },
      {
        id: 'msg-4',
        persona: 'felix',
        type: 'ai',
        content: "Thanks Sophie. Based on my analysis, here are the key findings from our Nordic market research:\n\n**Market Opportunity:**\n• The Swedish B2B SaaS market is growing at 23% annually\n• There's a significant gap in HR technology solutions for mid-sized companies\n• Local competitors are primarily focused on enterprise clients\n\n**Competitive Positioning:**\n• Your mid-market focus gives you a unique advantage\n• The \"Jobs to be Done\" framework reveals underserved needs in employee onboarding\n• Price sensitivity is lower than expected for quality solutions\n\n**Recommended Entry Strategy:**\n• Sweden as primary market (largest opportunity)\n• Partnership-led approach with local HR consultancies\n• Localization of core product features within 6 months",
        timestamp: new Date(Date.now() - 86400000 * 2 + 180000).toISOString(),
        sources: [
          { name: 'Nordic SaaS Market Report 2024', type: 'document' },
          { name: 'Competitor Analysis - Sweden.xlsx', type: 'file' },
          { name: 'Industry interviews (12 conducted)', type: 'research' }
        ],
        artifacts: [
          { name: 'Market Entry Strategy Summary.pdf', type: 'pdf' }
        ]
      },
      {
        id: 'msg-5',
        persona: null,
        type: 'user',
        content: "This is really helpful. Can you elaborate on the partnership strategy?",
        timestamp: new Date(Date.now() - 86400000 + 60000).toISOString()
      },
      {
        id: 'msg-6',
        persona: 'felix',
        type: 'ai',
        content: "Absolutely. I've developed a detailed partnership strategy based on our analysis:\n\n**Partnership Tiers:**\n\n1. **Strategic Partners** (2-3 targets)\n   • Large HR consultancies with Nordic presence\n   • Co-selling and co-marketing arrangements\n   • Revenue sharing model\n\n2. **Implementation Partners** (5-8 targets)\n   • Local IT service providers\n   • Technical integration specialists\n   • Training and support delivery\n\n3. **Referral Partners** (10-15 targets)\n   • Accounting firms serving SMBs\n   • Business associations\n   • Industry networks\n\n**Next Steps:**\n• I'm currently preparing outreach materials for the top 5 strategic partner candidates\n• Sophie is coordinating the timeline for initial partnership meetings in Q1 2025\n\nShould I share the detailed partner evaluation matrix?",
        timestamp: new Date(Date.now() - 86400000 + 120000).toISOString(),
        sources: [
          { name: 'Partner Evaluation Framework', type: 'document' },
          { name: 'Nordic HR Consultancy Landscape', type: 'research' }
        ]
      }
    ]
  })

  // Computed
  const currentPersona = computed(() => personas.value[activePersona.value])
  
  function getProjectConversation(projectId) {
    return conversations.value[projectId] || []
  }

  // Actions
  function setActivePersona(personaId) {
    activePersona.value = personaId
  }

  function addMessage(projectId, message) {
    if (!conversations.value[projectId]) {
      conversations.value[projectId] = []
    }
    conversations.value[projectId].push({
      id: `msg-${Date.now()}`,
      ...message,
      timestamp: new Date().toISOString()
    })
  }

  async function sendMessage(projectId, content) {
    // Add user message
    addMessage(projectId, {
      type: 'user',
      persona: null,
      content
    })

    // Simulate AI typing
    isTyping.value = true
    
    // Mock AI response after delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    isTyping.value = false

    // Add mock AI response
    const responses = [
      {
        persona: activePersona.value,
        content: activePersona.value === 'sophie' 
          ? "I've noted that down and will update the project plan accordingly. Is there anything specific you'd like me to prioritize?"
          : "That's a great point. Let me analyze this further and provide you with a detailed recommendation. I'll have an update ready within the hour.",
        sources: []
      }
    ]

    addMessage(projectId, {
      type: 'ai',
      ...responses[0]
    })
  }

  return {
    personas,
    activePersona,
    currentPersona,
    conversations,
    isTyping,
    getProjectConversation,
    setActivePersona,
    addMessage,
    sendMessage
  }
})
