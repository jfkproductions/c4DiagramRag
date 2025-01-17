

dd@startuml


!include  <C4/C4_Context.puml>
!include <office/Users/user.puml>

LAYOUT_WITH_LEGEND()

title System Diagram Sample


Person(AcmeProdOwner, Acme Production Owner , "<$user> \n Responsible for Production of widgets in ACME Production Site" )
Person(3rdProdOwner, 3rdParty Production Owner , "<$user> \n Responsible for Production of widgets in 3rdParty Production Site" )


System_Boundary(Remote, "Remote") {

    System(ProdSystemHost, "Production Host", "Drives widget Production\n Analyses widget Production data to create reports")
    System(Analytics, "Analytics", "Provides data analysis and a dashboard view data - including relevant Production data")
    System(Monitoring, "Monitoring", "Monitors Production Host\nUses AWS Services")
    System_Ext(SupplyChain, "SupplyChain", "Provides parts to make the widgets")
    System_Ext(InventoryTracking, "InventoryTracking", "Customer Reference")
    

}



Enterprise_Boundary(AcmeProd, "ACME Production Site") {

    System(AcmeWorkStation1, "WorkStation1", " Production setup for a group of widgets")    
    System(AcmeWorkStation2, "WorkStation2", " Production setup for a group of widgets")        
    System(AcmeWorkStationN, "WorkStationN", " Production setup for a group of widgets")        

}


Enterprise_Boundary(3rdProd, "3rdParty Production Site") {


    System(3rdWorkStation1, "WorkStation1", " Production setup for a group of widgets")    
    System(3rdWorkStation2, "WorkStation2", " Production setup for a group of widgets")        
    System(3rdWorkStationN, "WorkStationN", " Production setup for a group of widgets")     
}


Rel_U(AcmeWorkStation1, ProdSystemHost, "Sends Production report for widget")
Rel_U(AcmeWorkStation2, ProdSystemHost, "Sends Production report for widget")
Rel_U(AcmeWorkStationN, ProdSystemHost, "Sends Production report for widget")


Rel_U(3rdWorkStation1, ProdSystemHost, "Sends Production report for widget")
Rel_U(3rdWorkStation2, ProdSystemHost, "Sends Production report for widget")
Rel_U(3rdWorkStationN, ProdSystemHost, "Sends Production report for widget")





Rel_D(AcmeProdOwner, ProdSystemHost, "Reviews Acme and 3rdParty site Production reports")
Rel_D(3rdProdOwner, ProdSystemHost, "Reviews 3rdParty site Production reports")


Rel_D(Analytics, ProdSystemHost, "Data Analysis")
Rel_D(SupplyChain, ProdSystemHost, "Parts")
Rel_D(InventoryTracking, ProdSystemHost, "Tracking")
Rel_D(Monitoring, ProdSystemHost, "Monitoring")

footer %filename() rendered with PlantUML version %version()\nThe Hitchhiker’s Guide to PlantUML

@enduml
