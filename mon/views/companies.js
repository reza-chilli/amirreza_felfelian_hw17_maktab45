
function deleteCompany(e) {
  $.post("/company/deleteOne",{id:e.id});
  setTimeout(()=>{
    window.location.href = "/company/companies"
  }, 500)
}

function editCompany(e) {
  localStorage.setItem("editID", e.id.slice(4,));
}

function editMyCompany() {
  let name = document.getElementById("newCompanyName").value;
  let city = document.getElementById("newCompanyCity").value;
  let state = document.getElementById("newCompanyState").value;
  let phoneNumber = document.getElementById("newCompanyPhoneNumber").value;
  $.post('/company/editCompany',{id:localStorage.getItem("editID"),name:name,city:city,state:state,phoneNumber:phoneNumber});
  setTimeout(()=>{
    window.location.href = "/company/companies"
  }, 500)
}

$("#deleteAll").on('click', function() {
  $.get("/company/deleteAllCompanies")
  setTimeout(()=>{
    window.location.href = "/company/companies"
  }, 500)
})

function addNewCompany() {
  let name = document.getElementById("addCompanyName").value;
  let city = document.getElementById("addCompanyCity").value;
  let state = document.getElementById("addCompanyState").value;
  let phoneNumber = +document.getElementById("addCompanyPhoneNumber").value;
  let createdAt = new Date(document.getElementById("addCompanyDate").value);
  let registrationNumber = +document.getElementById("addCompanyRegNumber").value;
  $.post('/company/createNewCompany',{name,city,state,phoneNumber,createdAt,registrationNumber});
  setTimeout(()=>{
    window.location.href = "/company/companies"
  }, 500)
}

$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
  });
});

function showEmployees(e) {
  $.ajax({
    url: `/company/companies/showEmployee${e.id.slice(7,)}`,
    type: "GET",
    success: function (result) {
      window.location.href = `/company/companies/showEmployee${e.id.slice(7,)}`;
    }
  });
}

function filterByDate() {
  let startDate = $("#startDate").val();
  let endDate = $("#endDate").val();
  $.ajax({
    url: `/company/companies/filter`,
    type: "POST",
    data: {startDate, endDate},
    success: function (result) {
      console.log(result);
      let id = [];
      for (let i = 0;i < result.length;i++) {
        id.push(result[i]._id);
      }
      console.log(id);
      for (let i = 1;i < $("tr").length ;i++) {
        if (!id.includes($("tr")[i].classList[0])) {
          $("tr")[i].classList.add('hide')
        }
      }
    }
  });
}