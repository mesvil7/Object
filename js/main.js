// Create Main Class
function Person(name, salary){
	this.name   = name || 'Anonimno';
	this.salary = salary || 0;
}
Person.prototype.GetSalary = function(){
	return this.salary;
}

// Create sub class
function Employee(obj){
	Person.call(this, obj.name, obj.salary);
}
Employee.prototype            = Object.create(Person.prototype);
Employee.prototype.contructor = Employee;


function Admin(obj){
	Person.call(this, obj.name, obj.salary);
}
Admin.prototype            = Object.create(Person.prototype);
Admin.prototype.contructor = Admin;


// variables to use within ajax call
var html             ='',
	mainC 	     = document.getElementById("mainContent"),
	sumEmployees = 0, // to count employees
	sumAdmin     = 0; // to count Amin

// AJAX Callhin ajax call
function callJson(){

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        obj = JSON.parse(xmlhttp.responseText);

	        for (var name in obj[0]) {

	        	html += '<div class="box">'
	        	html += '<h1>'+name+'</h1>';
	        	html += '<div class="emBox">';

		        if (obj[0].hasOwnProperty(name)) {
		        	
		            newobj = eval('{' + name + '}');//turn the string into a object


		            for(var data in obj[0][name]){
		            	if(obj[0][name].hasOwnProperty(data)){

		            		// create instances of Employee or Admin
		            		var newEmployee = new newobj({
		            			name:obj[0][name][data]["name"],
		            			salary:obj[0][name][data]["salary"]
		            		}); 

		            		
		            		if(newEmployee instanceof Employee){
					    sumEmployees = sumEmployees + newEmployee.GetSalary();
					    html += '<p class="empl"><strong>Name: </strong>'+ newEmployee.name + '<strong> Salary: </strong>$' + newEmployee.GetSalary() + '</p>';

					}else if(newEmployee instanceof Admin){
					    sumAdmin = sumAdmin + newEmployee.GetSalary();
					    html += '<p class="empl admin"><strong>Name: </strong>'+ newEmployee.name + '<strong> Salary: </strong>$' + newEmployee.GetSalary() + '</p>';
					}
		            	}
		            }
		        }
		        html += '</div>';
		        var total = (name == 'Employee' ? sumEmployees : sumAdmin);
		        html += '<p class="total">Total Salaries: $'+ total + '</p>';
		        html += '</div>'
	    	}
		    mainC.innerHTML = html;
	    }
	}

	var newsEmployee = 'http://localhost:8080/practicas/Javascript/salarios/json/employees.json';
	xmlhttp.open("GET", newsEmployee, true);
	xmlhttp.send();
}

callJson();
