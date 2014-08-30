
(function ($) {
    $(function () {
        var uuid = Appbase.uuid();
        var myDataRef = Appbase.create("chatroom", "fb1");
        var me = null;
        var people = [];

        function find_my_love () {
          for (var i = 0; i < people.length; i++) {
            var person = people[i];
            var me_what = $('form[name=me] input[name=what]:checked').val();
            var me_gender = $('form[name=me] input[name=gender]:checked').val();
            var want_what = $('form[name=want] input[name=what]:checked').val();
            var want_gender = $('form[name=want] input[name=gender]:checked').val();
            if ((person.want.what == me_what) && (person.want.gender == me_gender) &&
                (person.me.what == want_what) && (person.me.gender == want_gender)) {
              alert("Found !");
            }
          }
        }

        myDataRef.on('edge_added', function(error, edgeRef) {
            edgeRef.on('properties', function(error, messageRef, pSnapshot) {
                var person = pSnapshot.properties();
                if (person.uuid != uuid) {
                  people.push(person);
                  find_my_love();
                }
                edgeRef.off();
            })
        });

        document.getElementById("go").onclick = function () {

            navigator.geolocation.getCurrentPosition(function (position) {

              var myMessageRef = Appbase.create("message", Appbase.uuid());
              me = {
                'what': $('form[name=me] input[name=what]:checked').val(),
                'gender': $('form[name=me] input[name=gender]:checked').val(),
              };
              var data = {
                'uuid': uuid,
                'me': me,
                'want': {
                  'what': $('form[name=want] input[name=what]:checked').val(),
                  'gender': $('form[name=want] input[name=gender]:checked').val(),
                },
                "position": position,
              };
              myMessageRef.setData(data);
              myDataRef.setEdge(myMessageRef, uuid);
              find_my_love();

              // var interval = window.setInterval(function () {}, 1000);


//             userRef.setData({
//                 status: "sudo",
//                 location: "Belo Horizonte, Brazil"
//             })

// tweetRef.setData({
//     message: "Remember Red, hope is a good thing."
// })

// userRef.on('properties', function(error, ref, userSnap) {
//     console.log(userSnap.properties().status)
//     console.log(userSnap.properties().location)
// })

// userRef.on('edge_added', function(error, edgeRef, eSnap) {
//     edgeRef.on('properties', function(error, ref, tweetSnap) {
//         console.log(tweetSnap.properties().message)
//     })
// })

            })
        };

    });
})($);
