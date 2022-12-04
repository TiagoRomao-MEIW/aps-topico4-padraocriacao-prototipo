function Activity(activityID, InveniRAstdID, DiscordChID, SlackChID, DiscordUsrId, SlackUsrId, MsgDiscord, MsgSlack, NumDiscord, NumSlack, MedNumDiscord, MedNumSlack,DataUltMsgDiscord, DataUltMsgSlack) { // criar a estrutura do protótipo

    this.activityID = activityID
    this.InveniRAstdID = InveniRAstdID
    this.DiscordChID = DiscordChID
    this.SlackChID = SlackChID
    this.DiscordUsrId = DiscordUsrId
    this.SlackUsrId = SlackUsrId
    this.MsgDiscord = MsgDiscord
    this.MsgSlack = MsgSlack
    this.NumDiscord = NumDiscord
    this.NumSlack = NumSlack
    this.MedNumDiscord = MedNumDiscord
    this.MedNumSlack = MedNumSlack
    this.DataUltMsgDiscord = DataUltMsgDiscord
    this.DataUltMsgSlack = DataUltMsgSlack

    var msg = 
            {
                "activityID": this.activityID,
                "InveniRAstdID": this.InveniRAstdID,
                "DiscordChID": this.DiscordChID,
                "SlackChID": this.SlackChID,
                "DiscordUsrId":this.DiscordUsrId,
                "SlackUsrId": this.SlackUsrId,
                "quantAnalytics": [{
                        "MsgSlack": this.MsgSlack
                    },
                    {
                        "MsgDiscord": this.MsgDiscord
                    },
                    {
                        "NumSlack": this.NumSlack
                    },
                    {
                        "NumDiscord": this.NumDiscord
                    },
                    {
                        "MedNumSlack": this.MedNumSlack
                    },
                    {
                        "MedNumDiscord": this.MedNumDiscord
                    }
                ],
                "qualAnalytics": [{
                        "DataUltMsgSlack": this.DataUltMsgSlack
                    },
                    {
                        "DataUltMsgDiscord": this.DataUltMsgDiscord
                    }
                ]
        
        
            }
        //console.log( "msg:")
        //console.log(msg)
        return msg
}

function ActivityPrototype(proto) { // cria uma nova instancia do protótipo (clone)
    this.proto = proto;

    this.clone = function () {
        var activity = new Activity();

        activity.activityID = proto.activityID
        activity.InveniRAstdID = proto.InveniRAstdID
        activity.DiscordChID = proto.DiscordChID
        activity.SlackChID = proto.SlackChID
        activity.DiscordUsrId = proto.DiscordUsrId
        activity.SlackUsrId = proto.SlackUsrId
        activity.quantAnalytics[0] = proto.quantAnalytics[0]
        activity.quantAnalytics[1] = proto.quantAnalytics[1]
        activity.quantAnalytics[2] = proto.quantAnalytics[2]
        activity.quantAnalytics[3] = proto.quantAnalytics[3]
        activity.quantAnalytics[4] = proto.quantAnalytics[4]
        activity.quantAnalytics[5] = proto.quantAnalytics[5]
        activity.qualAnalytics[0] = proto.qualAnalytics[0]
        activity.qualAnalytics[1] = proto.qualAnalytics[1]

        //console.log( "clone activity:")
        //console.log(activity)
        return activity;
    };
}


function receberParams(param){ // carrega parametros ficticios
    var ActID = '12345'
    var StdID = '75309'

    //document.getElementById("numAct").textContent='Configuração da Atividade ' + ActID;
    document.getElementById("numAluno").textContent='Atividade aluno n.º ' + StdID;

    if (param === 'activity') return ActID
    if (param === 'student') return StdID
}
function configActivity(activityID){      // configura a atividade
    const discord = document.getElementById("ChDiscord").value;
    const slack = document.getElementById("ChSlack").value;

    var configAct = [discord,slack]

    console.log('Simulação de configuração da atividade com os seguintes parametros (json_param):')
    console.log(configAct)

    return [discord,slack]
    
}

function getAnalyticsStd(activityID,InveniRAstdID){      // simula analiticas da atividade

    var quantA = ['tem msg Discord','tem msg Slack', 'nº msg discord','nº msg slack','media msg discord','media msg slack']
    var qualA =['data ultima msg discord', 'data ultima msg slack']

    return [quantA, qualA]
}

function runPrototype() { // executa padrão de criação Protótipo

    var actID = receberParams('activity')
    var stdID = receberParams('student')
    console.log('Parametros recebidos por POST: ActivityId: ' + actID + ' e InveniRAstdID: ' + stdID) // simula os parametros do POST com o activityID e o InveniRAstdID
    
    var json_params = new configActivity() // simula a obtenção do json_params da atividade desde a DB

    var IdStdDiscord = document.getElementById("IdDiscord").value;
    var IdStdSlack = document.getElementById("IdSlack").value;
    
    var analiticas = new getAnalyticsStd(actID,stdID) // simula a obtenção de analiticas da DB
    var quantA = analiticas[0] 
    var qualA = analiticas[1]
    console.log('quantA')
    console.log(quantA)
    console.log('qualA')
    console.log(qualA)

    var proto = new Activity('atividade 12345', 'numero aluno 75309', '#discord','#slack','ID Aluno Discord','ID Aluno Slack','tem msg Discord','tem msg Slack', 'nº msg discord','nº msg slack','media msg discord','media msg slack', 'data ultima msg discord', 'data ultima msg slack');
    var proto = new Activity(actID, stdID,json_params[0],json_params[1],IdStdDiscord,IdStdSlack,quantA[0],quantA[1],quantA[2],quantA[3],quantA[4],quantA[5], qualA[0],qualA[1]);
    var prototype = new ActivityPrototype(proto);
    var newActivity = prototype.clone();


    console.log("Clone do protótipo criado: ")
    console.log(newActivity)
    console.log("Atividade: " + newActivity.activityID+ ';'+" Nº Aluno: " + newActivity.InveniRAstdID)

    var output = document.getElementById('output');    
    output.innerHTML = "Clone do protótipo: <br/>" + JSON.stringify(newActivity, undefined, 2);   
    
    document.getElementById('StdProto').style.visibility = "visible"

}
