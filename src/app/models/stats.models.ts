export interface Stats {
    Agents: Agents
    Enseignants: Enseignants
    Eleves: Eleves
  }
  
  export interface Agents {
    nNbreDesAgents: number
    nNbreDesAgentsHommes: number
    nNbreDesAgentsFemmes: number
  }
  
  export interface Enseignants {
    nNbreDesEngnants: number
    nNbreDesEngnantsHommes: number
    nNbreDesEngnantsFemmes: number
  }
  
  export interface Eleves {
    nNbreDesEleves: number
    nNbreDesElevesGar: number
    nNbreDesElevesFilles: number
  }