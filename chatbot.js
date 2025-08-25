import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Clock, Calendar, Phone } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Bem-vindo(a) à Marayza Pires Pilates e Fisioterapia! 😊 Como podemos ajudá-lo(a) hoje?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const services = {
    'fisioterapia ortopédica': {
      name: 'Fisioterapia Ortopédica',
      description: 'Tratamento especializado para lesões musculoesqueléticas, dores nas costas, articulações e reabilitação pós-cirúrgica.',
      duration: '50 minutos',
      price: 'Consulte valores'
    },
    'fisioterapia pélvica': {
      name: 'Fisioterapia Pélvica e Obstétrica',
      description: 'Especializada em saúde da mulher, preparação para o parto, pós-parto e disfunções do assoalho pélvico.',
      duration: '50 minutos',
      price: 'Consulte valores'
    },
    'laser-terapia': {
      name: 'Laser-terapia',
      description: 'Tratamento com laser para alívio da dor, cicatrização e regeneração de tecidos.',
      duration: '30 minutos',
      price: 'Consulte valores'
    },
    'pilates solo': {
      name: 'Pilates Solo',
      description: 'Exercícios de pilates no solo para fortalecimento, flexibilidade e consciência corporal.',
      duration: '60 minutos',
      price: 'Consulte valores'
    },
    'pilates tradicional': {
      name: 'Pilates Tradicional',
      description: 'Pilates com equipamentos tradicionais para reabilitação e condicionamento físico.',
      duration: '50 minutos',
      price: 'Consulte valores'
    },
    'pilates acrobático': {
      name: 'Pilates Acrobático',
      description: 'Modalidade avançada que combina pilates com movimentos acrobáticos suspensos.',
      duration: '60 minutos',
      price: 'Consulte valores'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Saudações
    if (message.includes('olá') || message.includes('oi') || message.includes('bom dia') || message.includes('boa tarde')) {
      return "Olá! É um prazer falar com você! Como posso ajudá-lo(a) hoje? Posso fornecer informações sobre nossos serviços, horários ou ajudar com agendamentos.";
    }
    
    // Serviços específicos
    for (const [key, service] of Object.entries(services)) {
      if (message.includes(key) || message.includes(key.replace('-', ''))) {
        return `📍 **${service.name}**\n\n${service.description}\n\n⏰ Duração: ${service.duration}\n💰 Valor: ${service.price}\n\nGostaria de agendar uma consulta ou precisa de mais informações?`;
      }
    }
    
    // Lista de serviços
    if (message.includes('serviços') || message.includes('tratamentos') || message.includes('o que vocês fazem')) {
      return `🏥 **Nossos Serviços:**\n\n• Fisioterapia Ortopédica\n• Fisioterapia Pélvica e Obstétrica\n• Laser-terapia\n• Pilates Solo\n• Pilates Tradicional\n• Pilates Acrobático\n\nSobre qual serviço gostaria de saber mais?`;
    }
    
    // Agendamento
    if (message.includes('agendar') || message.includes('marcar') || message.includes('consulta') || message.includes('horário')) {
      return `📅 **Agendamento**\n\nFico feliz em ajudar com seu agendamento! \n\nPara agendar, você pode:\n• Ligar para (XX) XXXX-XXXX\n• WhatsApp: (XX) XXXXX-XXXX\n• Ou me diga qual serviço deseja e em qual período prefere, que posso verificar a disponibilidade!\n\nQual serviço gostaria de agendar?`;
    }
    
    // Valores/Preços
    if (message.includes('valor') || message.includes('preço') || message.includes('quanto custa')) {
      return `💰 **Valores**\n\nNossos valores variam de acordo com o tratamento escolhido. Para informações precisas sobre valores e possíveis convênios aceitos, por favor:\n\n📞 Ligue: (XX) XXXX-XXXX\n💬 WhatsApp: (XX) XXXXX-XXXX\n\nTeremos prazer em esclarecer todos os detalhes!`;
    }
    
    // Horário de funcionamento
    if (message.includes('horário') || message.includes('funcionamento') || message.includes('aberto')) {
      return `🕐 **Horário de Funcionamento**\n\n• Segunda e Quarta de 07:00h às 11:00h e de 14:00h às 20:00h\n• Terça e Quinta de 06:00h às 10:00h e de 14:00h às 20:00h\n\n📍 Estamos sempre prontos para atendê-lo(a)!`;
    }
    
    // Localização
    if (message.includes('endereço') || message.includes('localização') || message.includes('onde fica')) {
      return `📍 **Localização**\n\nAv Geraldo Emídio Carneiro, Nº 1 - Centro\nIpameri - Goiás\nCEP: 75780-000\n\nPrecisa de mais orientações para chegar até aqui?`;
    }
    
    // Despedida
    if (message.includes('tchau') || message.includes('obrigado') || message.includes('obrigada')) {
      return "Foi um prazer ajudá-lo(a)! 😊 Estamos sempre aqui quando precisar. Tenha um ótimo dia e esperamos vê-lo(a) em breve aqui no Studio!";
    }
    
    // Resposta padrão
    return `Entendi! Como um robô, estou aprendendo e melhorando para aprimorar nossa experiência de atendimento. Para melhor atendê-lo(a), posso ajudar com:\n\n• Informações sobre nossos serviços\n• Agendamentos\n• Horários de funcionamento\n• Localização\n• Valores\n\nOu se preferir, pode entrar em contato diretamente:\n📞 (64) 99259-2411\n💬 WhatsApp: (64) 9XXXX-XXXX\n\nComo posso ajudar?`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simula delay de digitação do bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const QuickButtons = () => {
    const quickOptions = [
      'Ver serviços',
      'Agendar consulta',
      'Horário de funcionamento',
      'Localização'
    ];

    return (
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50">
        {quickOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setInputText(option);
              setTimeout(() => handleSendMessage(), 100);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Assistente Virtual</h1>
            <p className="text-blue-100">Marayza Pires Pilates e Fisioterapia</p>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-blue-50 p-4 border-b">
        <div className="flex flex-wrap gap-6 text-sm text-blue-800">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Seg-Sex: 7h-19h | Sáb: 8h-12h</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>(XX) XXXX-XXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Agendamento online disponível</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.text}</div>
              <div className={`text-xs mt-1 ${
                message.isBot ? 'text-gray-500' : 'text-blue-100'
              }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
            
            {!message.isBot && (
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Buttons */}
      <QuickButtons />

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
          >
            <Send size={16} />
            Enviar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Para emergências, ligue diretamente: (64) XXXX-XXXX
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
